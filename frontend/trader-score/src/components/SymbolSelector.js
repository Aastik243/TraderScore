import React from 'react';

const symbols = ['BTC', 'ETH', 'USDT', 'ARB', 'DAI', 'MATIC'];

function SymbolSelector({ symbol, setSymbol }) {
  return (
    <div>
      <h2>Select Symbol:</h2>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        {symbols.map((sym) => (
          <option key={sym} value={sym}>{sym}</option>
        ))}
      </select>
    </div>
  );
}

export default SymbolSelector;
