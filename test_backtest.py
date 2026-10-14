import math
import unittest
from backtest import Config,backtest,synthetic_prices,drawdowns


class ResearchTests(unittest.TestCase):
    def test_seed_is_reproducible(self):
        self.assertEqual(synthetic_prices(seed=17),synthetic_prices(seed=17))
        self.assertNotEqual(synthetic_prices(seed=17),synthetic_prices(seed=18))

    def test_flat_series_has_no_trades(self):
        run=backtest([100]*50,Config(lookback=5))
        self.assertEqual(run['equity'],[1]*50)
        self.assertEqual(run['metrics']['total_turnover'],0)

    def test_signal_is_lagged(self):
        run=backtest([100,110,121,133.1],Config(lookback=1,cost_bps=0))
        self.assertEqual(run['positions'],[0,0,1,1])
        self.assertAlmostEqual(run['equity'][-1],1.21)

    def test_future_prices_cannot_change_past_positions(self):
        prices=synthetic_prices(samples=80)
        altered=prices[:40]+[p*3 for p in prices[40:]]
        first=backtest(prices,Config(lookback=5))
        second=backtest(altered,Config(lookback=5))
        self.assertEqual(first['positions'][:41],second['positions'][:41])
        self.assertEqual(first['equity'][:40],second['equity'][:40])

    def test_turnover_cost_is_charged(self):
        zero=backtest([100,110,121,133.1],Config(lookback=1,cost_bps=0))
        cost=backtest([100,110,121,133.1],Config(lookback=1,cost_bps=10))
        self.assertAlmostEqual(cost['net_returns'][2],zero['net_returns'][2]-.001)
        self.assertEqual(cost['turnover'][3],0)

    def test_drawdown_definition(self):
        dd=drawdowns([1,1.2,.9,1.3])
        self.assertAlmostEqual(min(dd),-.25)
        self.assertEqual(dd[-1],0)

    def test_inputs_are_validated(self):
        for prices in [[100],[100,0],[100,math.nan],[100,math.inf]]:
            with self.assertRaises(ValueError):backtest(prices)
        for kwargs in [{'lookback':0},{'lookback':True},{'cost_bps':-1},{'cost_bps':math.nan}]:
            with self.assertRaises(ValueError):Config(**kwargs)

    def test_warmup_volatility_is_not_filled_with_fake_values(self):
        run=backtest(synthetic_prices(samples=60),Config(lookback=21))
        self.assertTrue(all(v is None for v in run['rolling_volatility'][:21]))
        self.assertIsNotNone(run['rolling_volatility'][21])


if __name__=='__main__':unittest.main()
