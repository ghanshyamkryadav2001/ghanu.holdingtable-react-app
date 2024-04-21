import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HoldingsTable from './components/HoldingsTable';

function App() {
  const [holdingsData, setHoldingsData] = useState([]);

  useEffect(() => {
    // Fetch holdings data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/holdings');
        setHoldingsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    
      <HoldingsTable holdingsData={holdingsData} />
    </div>
  );
}

export default App;
