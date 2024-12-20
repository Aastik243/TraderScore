import {default as RedisMock} from "ioredis-mock"; 
import { processTrade, getTop10Traders } from "../src/leaderboard.js" 
jest.mock('ioredis', () => {
    const RedisMock = require('ioredis-mock');
    return RedisMock;
  });
  
  describe('Leaderboard Tests', () => {
    let redis;
  
    beforeAll(() => {
   
      redis = new RedisMock();
    });
  
    beforeEach(async () => {
      await redis.flushall(); 
    });
  
    afterEach(async () => {
      await redis.flushall(); 
    });

    test('should process trades correctly for the BTC symbol', async () => {
        await processTrade('T1', 100, 'BTC');
        await processTrade('T2', 200, 'BTC');
        await processTrade('T1', 50, 'BTC');

        const topTraders = await getTop10Traders('BTC');

        expect(topTraders).toEqual([
            { rank: 1, traderId: 'T2', volume: 200 },
            { rank: 2, traderId: 'T1', volume: 150 },
        ]);
    });

    test('should return empty leaderboard if no trades are processed for a symbol', async () => {
        const topTraders = await getTop10Traders('BTC');
        expect(topTraders).toEqual([]);
    });

    test('should ignore trades for invalid symbols', async () => {
        await processTrade('T1', 100, 'BTC'); // Valid trade
        await processTrade('T2', 200, 'INVALID'); // Invalid trade

        const topTraders = await getTop10Traders('BTC');
        expect(topTraders).toEqual([{ rank: 1, traderId: 'T1', volume: 100 }]);
    });

    test('should handle invalid trade data', async () => {
        await processTrade('', 100, 'BTC'); // Invalid trader ID

        const topTraders = await getTop10Traders('BTC');
        expect(topTraders).toEqual([]);
    });

    test('should maintain separate leaderboards for different symbols', async () => {
        // Process trades for BTC
        await processTrade('T1', 100, 'BTC');
        await processTrade('T2', 150, 'BTC');

        // Process trades for ETH
        await processTrade('T3', 300, 'ETH');
        await processTrade('T4', 50, 'ETH');

        const topTradersBTC = await getTop10Traders('BTC');
        const topTradersETH = await getTop10Traders('ETH');

        expect(topTradersBTC).toEqual([
            { rank: 1, traderId: 'T2', volume: 150 },
            { rank: 2, traderId: 'T1', volume: 100 },
        ]);

        expect(topTradersETH).toEqual([
            { rank: 1, traderId: 'T3', volume: 300 },
            { rank: 2, traderId: 'T4', volume: 50 },
        ]);
    });
});

