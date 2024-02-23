// GraphPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from '../graph/graph';
import Candlestick from '../candlestick/candlestick';
import Carousel from '../carousel/carousel'; // Import your carousel component

const GraphPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin'); // State to track the selected crypto asset

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=30&interval=daily`);
        setCryptoData(response.data.prices);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, [selectedCrypto]); // Fetch data whenever selectedCrypto changes

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
  };

  return (
    <div className="app">
      <h1>Cryptocurrency Candlestick Chart</h1>
      <Carousel
        selectedCrypto={selectedCrypto}
        onSelectCrypto={handleCryptoChange}
      />
      <Chart cryptoData={cryptoData} />
      <Candlestick cryptoData={cryptoData} />
    </div>
  );
};

export default GraphPage;
