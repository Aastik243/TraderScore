import { getTop10Traders } from './leaderboard.js';
import { simulateTradeStream } from './tradeProcessor.js';
import express from 'express';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import cron from 'node-cron';
import cors from "cors";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const symbols = ["BTC", "ETH", "USDT", "ARB", "DAI", "MATIC"]; 
const redis = new Redis(); // Connect to your Redis instance
app.use(cors());


simulateTradeStream();

// API Endpoint to get leaderboards for all symbols
app.get('/leaderboards', async (req, res) => {
    try {
        const leaderboards = {};

        for (const symbol of symbols) {
            const topTraders = await getTop10Traders(symbol);
            leaderboards[symbol] = topTraders;
        }

        res.status(200).json(leaderboards);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leaderboards' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
