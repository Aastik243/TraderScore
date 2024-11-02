import { processTrade } from "./leaderboard.js";

export const simulateTradeStream = () => {
    const sampleTraders = ['T1', 'T2', 'T3', 'T4', 'T5'];

    setInterval(() => {
        const traderId = sampleTraders[Math.floor(Math.random() * sampleTraders.length)];
        const volume = Math.floor(Math.random() * 100) + 1; // Random volume between 1 and 100
        processTrade(traderId, volume);
    }, 1000); // Simulating a trade every second
}


