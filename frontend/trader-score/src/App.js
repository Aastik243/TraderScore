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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/leaderboards`);
      const data = await response.json();
      setLeaderboards(data); 
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  useEffect(() => {
    fetchLeaderboards();
    const interval = setInterval(fetchLeaderboards, 60000); // Fetch every minute
    return () => clearInterval(interval); 
  }, [selectedSymbol]);

  return (
    <div className="container">
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
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards[selectedSymbol]?.map((trader) => (
                  <tr key={trader.traderId}>
                    <td>{trader.rank}</td>
                    <td>{trader.traderId}</td>
                    <td>{trader.volume} {selectedSymbol}</td>
                    <td>{formatDate(parseInt(trader.timestamp))}</td>
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
