"""New AI-assisted educational example using synthetic providers, no API keys."""
import asyncio
from collections import OrderedDict
from dataclasses import dataclass
import time


class UnavailableError(RuntimeError):
    pass


@dataclass(frozen=True)
class Result:
    value: object
    source: str
    status: str
    age_s: float


class ResilientCache:
    """Single-event-loop cache with per-key coalescing and bounded stale age.

    Providers are (name, async callable) pairs. max_age is the absolute age
    limit, including the fresh TTL. Values are shared: use immutable values
    or copy them before caller mutation. This is not a distributed cache.
    """
    def __init__(self, providers, ttl=60, max_age=300, capacity=128, clock=time.monotonic):
        if not providers or ttl < 0 or max_age < ttl or capacity < 1:
            raise ValueError('Invalid providers or cache limits')
        self.providers = list(providers)
        self.ttl, self.max_age, self.capacity, self.clock = ttl,max_age,capacity,clock
        self.entries = OrderedDict()
        self.inflight = {}

    async def get(self, key):
        entry = self.entries.get(key)
        if entry:
            timestamp,value,source = entry
            age = max(0,self.clock()-timestamp)
            if age < self.ttl:
                self.entries.move_to_end(key)
                return Result(value,source,'fresh',age)
        task = self.inflight.get(key)
        if task is None:
            task = asyncio.create_task(self._fetch(key))
            self.inflight[key] = task
            # Consume errors even if all waiting callers cancel.
            task.add_done_callback(lambda completed: None if completed.cancelled() else completed.exception())
        return await asyncio.shield(task)

    async def _fetch(self,key):
        errors = []
        try:
            for index,(name,provider) in enumerate(self.providers):
                try:
                    value = await provider(key)
                except Exception as error:
                    errors.append(type(error).__name__)
                    continue
                self.entries[key] = (self.clock(),value,name)
                self.entries.move_to_end(key)
                while len(self.entries) > self.capacity:
                    self.entries.popitem(last=False)
                return Result(value,name,'fresh' if index == 0 else 'fallback',0)
            entry = self.entries.get(key)
            if entry:
                timestamp,value,source = entry
                age = max(0,self.clock()-timestamp)
                if age <= self.max_age:
                    self.entries.move_to_end(key)
                    return Result(value,source,'stale',age)
                del self.entries[key]
            raise UnavailableError('All providers failed; no usable cache entry: '+', '.join(errors))
        finally:
            self.inflight.pop(key,None)


async def demo():
    async def primary(key):
        raise ConnectionError('Synthetic primary-source outage')
    async def secondary(key):
        return {'key':key,'reading':23.5,'data_kind':'synthetic'}
    cache = ResilientCache([('primary-demo',primary),('secondary-demo',secondary)])
    print(await cache.get('sensor-a'))
    print(await cache.get('sensor-a'))


if __name__ == '__main__':
    asyncio.run(demo())
