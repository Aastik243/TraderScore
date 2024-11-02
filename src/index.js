import { getTop10Traders } from './leaderboard.js';
import { simulateTradeStream } from './tradeProcessor.js';
import cron from "node-cron";

// Simulate incoming trades
simulateTradeStream();

// Schedule leaderboard update every minute
cron.schedule('* * * * *', async () => {
    try {
        const topTraders = await getTop10Traders();
        console.log("Top 10 Traders by Volume:");
        topTraders.forEach((trader) => {
            console.log(`${trader.rank}. Trader ${trader.traderId} - ${trader.volume} units`);
        });
    } catch (error) {
        console.error("Error fetching top traders:", error);
    }
});