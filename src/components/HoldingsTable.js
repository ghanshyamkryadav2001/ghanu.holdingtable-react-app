import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/styles/holdingtable.css'; // Adjust path as necessary

function HoldingsTable() {
  const [holdings, setHoldings] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios.get('https://canopy-frontend-task.now.sh/api/holdings')
      .then(response => {
        const data = response.data.payload;
        const groupedData = {};
        data.forEach(holding => {
          if (!groupedData[holding.asset_class]) {
            groupedData[holding.asset_class] = [];
          }
          groupedData[holding.asset_class].push(holding);
        });
        const sortedData = Object.keys(groupedData).sort((a, b) => {
          if (a === 'Real Estate') return -1;
          if (b === 'Real Estate') return 1;
          return a.localeCompare(b);
        }).reduce((obj, key) => {
          obj[key] = groupedData[key];
          return obj;
        }, {});
        setHoldings(sortedData);
        const initialExpandedState = {};
        Object.keys(sortedData).forEach(assetClass => {
          initialExpandedState[assetClass] = true;
        });
        setExpanded(initialExpandedState);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleExpand = (assetClass) => {
    setExpanded(prevState => ({
      ...prevState,
      [assetClass]: !prevState[assetClass],
    }));
  };

  return (
    <div className="holdings-container">
      <h1 className="holdings-header">Holdings Table</h1>
      {Object.keys(holdings).map(assetClass => (
        <div key={assetClass} className="asset-class-container">
          <h2 className="asset-class-header" onClick={() => toggleExpand(assetClass)}>
          <span className={`arrow ${expanded[assetClass] ? '' : 'up'}`} style={{ marginRight: '10px' }}>
          {expanded[assetClass] ? '▼' : '▲'}
          </span>
          <span>{assetClass} ({holdings[assetClass].length})</span>

          </h2>
          {expanded[assetClass] && (
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Name of the holding</th>
                  <th>Ticker</th>
                  <th>Average Price</th>
                  <th>Market Price</th>
                  <th>Latest Change (%)</th>
                  <th>Market Value (Base CCY)</th>
                </tr>
              </thead>
              <tbody>
                {holdings[assetClass].map((holding, index) => (
                  <tr key={index}>
                    <td>{holding.name}</td>
                    <td>{holding.ticker}</td>
                    <td className={holding.avg_price < 0 ? 'negative' : ''}>{holding.avg_price}</td>
                    <td className={holding.market_price < 0 ? 'negative' : ''}>{holding.market_price}</td>
                    <td className={holding.latest_chg_pct < 0 ? 'negative' : ''}>{holding.latest_chg_pct}</td>
                    <td>{holding.market_value_ccy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoldingsTable;
