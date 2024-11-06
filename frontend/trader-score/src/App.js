import React, { useEffect, useState } from 'react';
import './App.css';  

const App = () => {
  const [leaderboards, setLeaderboards] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC"); 

  const symbols = ["BTC", "ETH", "USDT", "ARB", "DAI", "MATIC"];

  
  const fetchLeaderboards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/leaderboards`);
      const data = await response.json();
      setLeaderboards(data); 
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLeaderboards();
    const interval = setInterval(fetchLeaderboards, 60000); // Fetch every minute
    return () => clearInterval(interval); 
  }, [selectedSymbol]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Trading Leaderboard</h1>

      {/* Symbol Selector */}
      <select
        id="symbol-selector"
        className="select-symbol"
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
      >
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="table-container">
          <h2>{selectedSymbol} Ranking</h2>
          {leaderboards[selectedSymbol]?.length === 0 ? (
            <p>No traders found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Volume Traded</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards[selectedSymbol]?.map((trader) => (
                  <tr key={trader.traderId}>
                    <td>{trader.rank}</td>
                    <td>{trader.traderId}</td>
                    <td>{trader.volume} {selectedSymbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
