import React, { useState, useEffect } from 'react';
import './CandlestickChart.css';

const CandlestickChart = ({ cryptoData, timeScale }) => {
  useEffect(() => {
    if (!cryptoData.length) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const chartContainer = document.getElementById('candlestick-chart-container');
    chartContainer.innerHTML = '';
    chartContainer.appendChild(canvas);

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

    const width = 800;
    const height = 400;
    const padding = 40;
    const yScale = (height - 2 * padding) / (maxValue - minValue);
    const xScale = width / (labels.length - 1);

    canvas.width = width;
    canvas.height = height;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    const step = Math.ceil(labels.length / (width / 100));
    labels.forEach((label, index) => {
      if (index % step === 0) {
        ctx.fillText(label, padding + index * xScale, height - padding + 20);
      }
    });

    const yStep = (maxValue - minValue) / 5;
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - i * (height - 2 * padding) / 5;
      ctx.fillText((minValue + i * yStep).toFixed(2), padding - 30, y);
    }

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

  }, [cryptoData, timeScale]);

  return (
    <div className="candlestick-chart-container" id="candlestick-chart-container">
      <h2>Candlestick Chart</h2>
    </div>
  );
};

export default CandlestickChart;
