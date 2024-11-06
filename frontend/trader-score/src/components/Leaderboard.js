import React from 'react';

function Leaderboard({ topTraders }) {
  return (
    <div>
      <h2>Top Traders</h2>
      <ul>
        {topTraders.map((trader, index) => (
          <li key={index}>
            {trader.rank}. Trader {trader.traderId} - {trader.volume} units
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
