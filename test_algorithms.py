import asyncio
import math
import unittest
from thermal_model import Geometry, bisect_root, forced_convection, natural_convection, system_pressure
from resilient_cache import ResilientCache, UnavailableError


class ThermalTests(unittest.TestCase):
    def test_known_root_and_invalid_bracket(self):
        self.assertAlmostEqual(bisect_root(lambda x:x*x-2,0,2),math.sqrt(2),places=10)
        with self.assertRaises(ValueError):
            bisect_root(lambda x:x*x+1,0,2)

    def test_reference_operating_point(self):
        # Existing MATLAB sweep CSV, N=14 H=35 mm; numerical reference only.
        result = forced_convection()
        self.assertAlmostEqual(result['flow_m3_s'],.00452855913558679,places=10)
        self.assertAlmostEqual(result['resistance_K_W'],.50178411224419,places=7)
        self.assertLess(abs(result['pressure_residual_Pa']),1e-5)

    def test_height_sweep_reference(self):
        result = forced_convection(Geometry(height=.015))
        self.assertAlmostEqual(result['flow_m3_s'],.00398430994917546,places=10)
        self.assertAlmostEqual(result['resistance_K_W'],.758551089380057,places=7)

    def test_geometry_and_zero_flow(self):
        self.assertEqual(system_pressure(0,Geometry()),0)
        for kwargs in [{'fins':1},{'fins':2.5},{'height':-1},{'fins':40},{'height':math.nan}]:
            with self.assertRaises(ValueError):
                Geometry(**kwargs)

    def test_natural_convergence_and_failure(self):
        result = natural_convection()
        self.assertGreater(result['resistance_K_W'],0)
        self.assertLess(result['convergence_residual_K'],.001)
        with self.assertRaises(RuntimeError):
            natural_convection(max_iterations=1)

    def test_extrapolation_is_visible(self):
        self.assertTrue(forced_convection(Geometry(fins=8))['fan_fit_extrapolated'])
        self.assertFalse(forced_convection()['fan_fit_extrapolated'])


class CacheTests(unittest.IsolatedAsyncioTestCase):
    async def test_coalesces_concurrent_callers(self):
        calls = 0
        gate = asyncio.Event()
        async def provider(key):
            nonlocal calls
            calls += 1
            await gate.wait()
            return 7
        cache = ResilientCache([('demo',provider)])
        requests = [asyncio.create_task(cache.get('x')) for _ in range(40)]
        await asyncio.sleep(0)
        gate.set()
        results = await asyncio.gather(*requests)
        self.assertEqual(calls,1)
        self.assertTrue(all(r.value==7 for r in results))

    async def test_fallback_then_cache_hit(self):
        calls = []
        async def primary(key):
            calls.append('primary')
            raise ConnectionError()
        async def secondary(key):
            calls.append('secondary')
            return 5
        cache = ResilientCache([('primary',primary),('secondary',secondary)])
        first,second = await cache.get('x'),await cache.get('x')
        self.assertEqual(first.status,'fallback')
        self.assertEqual(second.status,'fresh')
        self.assertEqual(second.source,'secondary')
        self.assertEqual(calls,['primary','secondary'])

    async def test_stale_age_and_expiry(self):
        now,fail = [0],[False]
        async def provider(key):
            if fail[0]:
                raise ConnectionError()
            return 3
        cache = ResilientCache([('demo',provider)],ttl=10,max_age=30,clock=lambda:now[0])
        await cache.get('x')
        fail[0],now[0] = True,11
        self.assertEqual((await cache.get('x')).status,'stale')
        now[0] = 31
        with self.assertRaises(UnavailableError):
            await cache.get('x')
        self.assertEqual(cache.inflight,{})

    async def test_waiter_cancellation_preserves_fetch(self):
        gate,started = asyncio.Event(),asyncio.Event()
        calls = 0
        async def provider(key):
            nonlocal calls
            calls += 1
            started.set()
            await gate.wait()
            return 9
        cache = ResilientCache([('demo',provider)])
        first = asyncio.create_task(cache.get('x'))
        await started.wait()
        second = asyncio.create_task(cache.get('x'))
        first.cancel()
        with self.assertRaises(asyncio.CancelledError):
            await first
        gate.set()
        self.assertEqual((await second).value,9)
        self.assertEqual(calls,1)

    async def test_capacity_is_bounded(self):
        async def provider(key):
            return key
        cache = ResilientCache([('demo',provider)],capacity=2)
        for key in ['a','b','c']:
            await cache.get(key)
        self.assertEqual(list(cache.entries),['b','c'])


if __name__ == '__main__':
    unittest.main()
