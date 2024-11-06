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

export const processTrade = async (traderId, volume, symbol,timestamp) => {
    if (!symbols.includes(symbol)) {
        return;
    }
    if(traderId==''){
        return;
    }
    const LEADERBOARD_KEY = `leaderboard:${symbol}`;
    await redis.zincrby(LEADERBOARD_KEY, volume, traderId);
    const TRADE_DETAILS_KEY = `trade:${symbol}:${traderId}`;
    await redis.hset(TRADE_DETAILS_KEY, 'timestamp', timestamp);
};

// Retrieve top 10 traders for the leaderboard

export const getTop10Traders = async (symbol) => {
    if (!symbols.includes(symbol)) {
        throw new Error(`Invalid symbol: ${symbol}`);
    }
    const LEADERBOARD_KEY = `leaderboard:${symbol}`;
    const topTraders = await redis.zrevrange(LEADERBOARD_KEY, 0, 9, 'WITHSCORES');
    
    // Retrieve the top traders and their scores
    const traderData = await Promise.all(
        topTraders
            .filter((_, i) => i % 2 === 0) // Filter to get only trader IDs
            .map(async (traderId, index) => {
                const volume = parseFloat(topTraders[index * 2 + 1]);
                const TRADE_DETAILS_KEY = `trade:${symbol}:${traderId}`;
                const timestamp = await redis.hget(TRADE_DETAILS_KEY, 'timestamp');
                return {
                    rank: index + 1,
                    traderId,
                    volume,
                    timestamp: timestamp || 'N/A', // Fallback if no timestamp is found
                };
            })
    );
    
    return traderData;
}    

