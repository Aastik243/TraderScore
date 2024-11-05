import Redis from "ioredis-mock"; // Use a mock Redis client for testing
import { processTrade, getTop10Traders } from "../src/leaderboard.js" // Adjust the path as needed


describe('Leaderboard Tests', () => {
    let redis;

    beforeAll(() => {
        redis = new Redis();
    });

    afterEach(async () => {
        await redis.flushall(); // Clear Redis after each test
    });

    test('should process trades correctly', async () => {
        await processTrade('T1', 100, 'BTC');
        await processTrade('T2', 200, 'BTC');
        await processTrade('T1', 50, 'BTC');

        const topTraders = await getTop10Traders();

        expect(topTraders).toEqual([
            { rank: 1, traderId: 'T2', volume: 200 },
            { rank: 2, traderId: 'T1', volume: 150 },
        ]);
    });

    test('should return empty leaderboard if no trades are processed', async () => {
        const topTraders = await getTop10Traders();
        expect(topTraders).toEqual([]);
    });

    test('should ignore trades for invalid symbols', async () => {
        await processTrade('T1', 100, 'BTC'); // Valid trade
        await processTrade('T2', 200, 'ET'); // Invalid trade

        const topTraders = await getTop10Traders();
        expect(topTraders).toEqual([{ rank: 1, traderId: 'T1', volume: 100 }]);
    });

    test('should handle invalid trade data', async () => {
        await processTrade('', 100, 'BTC'); // Invalid trader ID
        await processTrade('T2', -50, 'BTC'); // Invalid volume

        const topTraders = await getTop10Traders();
        expect(topTraders).toEqual([]);
    });
});
