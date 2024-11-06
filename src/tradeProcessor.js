import { processTrade } from "./leaderboard.js";

export const simulateTradeStream = () => {
    const sampleTraders = Array.from({ length: 100 }, (_, i) => `T${i + 1}`); // array of 100 traders named T1, T2,...,T100
    const symbols = ["BTC", "ETH", "USDT", "ARB", "DAI", "MATIC"] // array of verified symbols

    setInterval(() => {
        const traderId = sampleTraders[Math.floor(Math.random() * sampleTraders.length)];
        const volume = Math.floor(Math.random() * 100) + 1; // Random volume between 1 and 100
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const timestamp = Date.now();
        processTrade(traderId, volume, symbol,timestamp);
    }, 1000); // Simulating a trade every second
}


