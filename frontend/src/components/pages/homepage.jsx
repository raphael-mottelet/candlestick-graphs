import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from '../graph/graph';
import Candlestick from '../candlestick/candlestick';
import Carousel from '../carousel/carousel';
import TimeScaleButtons from '../Buttons/time-scale-buttons';

const GraphPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [showCandlestick, setShowCandlestick] = useState(false); // State to track whether to show candlestick chart
  const [selectedTimeScale, setSelectedTimeScale] = useState('Day'); // State to track the selected time scale

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
  }, [selectedCrypto]);

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const toggleChartType = () => {
    setShowCandlestick(prevState => !prevState); // Toggle between line chart and candlestick chart
  };

  const handleTimeScaleChange = (timeScale) => {
    setSelectedTimeScale(timeScale); // Update the selected time scale
  };

  return (
    <div className="app">
      <h1>{showCandlestick ? 'Candlestick Chart' : 'Line Chart'}</h1>
      <Carousel
        selectedCrypto={selectedCrypto}
        onSelectCrypto={handleCryptoChange}
      />
      <TimeScaleButtons onSelectTimeScale={handleTimeScaleChange} /> {/* Utilisation du composant TimeScaleButtons */}
      <button onClick={toggleChartType}>
        {showCandlestick ? 'Switch to Line Chart' : 'Switch to Candlestick Chart'}
      </button>
      {showCandlestick ? <Candlestick cryptoData={cryptoData} /> : <Chart cryptoData={cryptoData} timeScale={selectedTimeScale} />} {/* Passer le timeScale sélectionné au composant Chart */}
    </div>
  );
};

export default GraphPage;
