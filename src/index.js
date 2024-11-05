import { getTop10Traders } from './leaderboard.js';
import { simulateTradeStream } from './tradeProcessor.js';
import cron from "node-cron";

const symbols = ["BTC", "ETH", "USDT", "ARB", "DAI", "MATIC"]; // Array of verified symbols

// Simulate incoming trades
simulateTradeStream();

// Function to display all leaderboards
const displayAllLeaderboards = async () => {
    for (const symbol of symbols) {
        try {
            const topTraders = await getTop10Traders(symbol);
            console.log(`Top 10 Traders by Volume for ${symbol}:`);
            topTraders.forEach((trader) => {
                console.log(`${trader.rank}. Trader ${trader.traderId} - ${trader.volume} units`);
            });
        } catch (error) {
            console.error(`Error fetching top traders for ${symbol}:`, error);
        }
    }
};

// Run the leaderboard display immediately on start
displayAllLeaderboards();

// Schedule leaderboard updates to run every minute
cron.schedule('* * * * *', displayAllLeaderboards);