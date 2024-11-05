import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();


// Connect to Redis
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

const symbols = ["BTC", "ETH", "USDT", "ARB", "DAI", "MATIC"] // array of verified symbols


/**
 * traderId - ID of the trader
 * volume - Trade volume to be added to leaderboard score
 */

export const processTrade = async (traderId, volume, symbol) => {
    if (!symbols.includes(symbol)) {
        throw new Error(`Invalid symbol: ${symbol}`);
    }
    const LEADERBOARD_KEY = `leaderboard:${symbol}`;
    await redis.zincrby(LEADERBOARD_KEY, volume, traderId);
};

// Retrieve top 10 traders for the leaderboard

export const getTop10Traders = async (symbol) => {
    if (!symbols.includes(symbol)) {
        throw new Error(`Invalid symbol: ${symbol}`);
    }
    const LEADERBOARD_KEY = `leaderboard:${symbol}`;
    const topTraders = await redis.zrevrange(LEADERBOARD_KEY, 0, 9, 'WITHSCORES');
    
    return topTraders
        .map((entry, index) => ({
            rank: Math.floor(index / 2) + 1,
            traderId: entry,
            volume: parseFloat(topTraders[index + 1]),
        }))
        .filter((_, i) => i % 2 === 0);
};

