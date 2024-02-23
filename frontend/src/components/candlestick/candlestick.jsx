// Candlestick.js
import React from 'react';
import './Candlestick.css';

const Candlestick = ({ cryptoData }) => {
  const candlestickContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (!cryptoData.length) return;

    const canvas = document.createElement('canvas');
    candlestickContainerRef.current.innerHTML = '';
    candlestickContainerRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const prices = cryptoData.map(data => data[1]);

    const minValue = Math.min(...prices);
    const maxValue = Math.max(...prices);

    const width = 800; // Augmenter la largeur du graphique
    const height = 400; // Augmenter la hauteur du graphique
    const padding = 60; // Augmenter l'espacement pour les marges
    const yScale = (height - 2 * padding) / (maxValue - minValue);
    const xScale = width / (cryptoData.length - 1);

    canvas.width = width;
    canvas.height = height;

    cryptoData.forEach((data, index) => {
      const [timestamp, open, high, low, close] = data;
      const x = padding + index * xScale;
      const yHigh = height - padding - (high - minValue) * yScale;
      const yLow = height - padding - (low - minValue) * yScale;
      const yOpen = height - padding - (open - minValue) * yScale;
      const yClose = height - padding - (close - minValue) * yScale;

      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.strokeStyle = close > open ? 'green' : 'red';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 5, yOpen);
      ctx.lineTo(x, yOpen);
      ctx.lineTo(x, yClose);
      ctx.lineTo(x + 5, yClose);
      ctx.stroke();
    });
  }, [cryptoData]);

  return (
    <div className="candlestick-container" ref={candlestickContainerRef}>
      <h2>Candlestick Chart</h2>
    </div>
  );
};

export default Candlestick;
