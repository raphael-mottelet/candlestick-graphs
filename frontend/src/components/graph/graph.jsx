// Chart.js
import React, { useState } from 'react';
import './Chart.css';
import Candlestick from '../candlestick/candlestick'; // Import du composant Candlestick

const Chart = ({ cryptoData, timeScale }) => {
  const [chartType, setChartType] = useState('Line'); // État local pour suivre le type de graphique sélectionné

  const toggleChartType = () => {
    setChartType(prevChartType => prevChartType === 'Line' ? 'Candlestick' : 'Line'); // Basculer entre Line et Candlestick
  };

  const chartContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (!cryptoData.length) return;

    const canvas = document.createElement('canvas');
    chartContainerRef.current.innerHTML = '';
    chartContainerRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const labels = cryptoData.map(data => {
      const timestamp = new Date(data[0]);
      switch (timeScale) {
        case 'Hour':
          return timestamp.toLocaleTimeString();
        case 'Day':
          return timestamp.toLocaleDateString();
        case 'Week':
          return `Week ${timestamp.toLocaleDateString()}`;
        case 'Month':
          return `${timestamp.toLocaleDateString('default', { month: 'short' })} ${timestamp.getFullYear()}`;
        default:
          return timestamp.toLocaleDateString();
      }
    });
    const prices = cryptoData.map(data => data[1]);

    const minValue = Math.min(...prices);
    const maxValue = Math.max(...prices);

    const width = 1600; // Largeur du graphique
    const height = 400; // Hauteur du graphique
    const padding = 40;
    const yScale = (height - 2 * padding) / (maxValue - minValue);
    const xScale = width / (labels.length - 1);

    canvas.width = width; // Ajuster la largeur du canevas
    canvas.height = height; // Ajuster la hauteur du canevas

    // Dessiner les axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Dessiner les étiquettes sur l'axe X
    const step = Math.ceil(labels.length / (width / 100)); // Nombre d'étiquettes à afficher
    labels.forEach((label, index) => {
      if (index % step === 0) {
        ctx.fillText(label, padding + index * xScale, height - padding + 20);
      }
    });

    // Dessiner les étiquettes sur l'axe Y
    const yStep = (maxValue - minValue) / 5;
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - i * (height - 2 * padding) / 5;
      ctx.fillText((minValue + i * yStep).toFixed(2), padding - 30, y);
    }

    // Dessiner le type de graphique approprié
    if (chartType === 'Line') {
      // Dessiner la ligne du graphique
      ctx.beginPath();
      ctx.moveTo(padding, height - padding - (prices[0] - minValue) * yScale);
      prices.forEach((price, index) => {
        ctx.lineTo(padding + index * xScale, height - padding - (price - minValue) * yScale);
      });
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    } else if (chartType === 'Candlestick') {
      // Dessiner les chandeliers japonais
      const candlestickData = cryptoData.map(data => [data[0], data[1], data[2], data[3], data[4]]);
      const candlestickProps = { cryptoData: candlestickData, width, height, padding, minValue, yScale, xScale, ctx };
      Candlestick.drawCandlestickChart(candlestickProps);
    }
  }, [cryptoData, timeScale, chartType]);

  return (
    <div className="chart-container" ref={chartContainerRef}>
      <h2>{chartType === 'Line' ? 'Line Chart' : 'Candlestick Chart'}</h2>
      <button onClick={toggleChartType}>{chartType === 'Line' ? 'Switch to Candlestick' : 'Switch to Line'}</button>
    </div>
  );
};

export default Chart;
