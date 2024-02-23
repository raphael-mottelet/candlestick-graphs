// Chart.js
import React from 'react';
import './Chart.css';

const Chart = ({ cryptoData }) => {
  const chartContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (!cryptoData.length) return;

    const canvas = document.createElement('canvas');
    chartContainerRef.current.innerHTML = '';
    chartContainerRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const labels = cryptoData.map(data => new Date(data[0]).toLocaleDateString());
    const prices = cryptoData.map(data => data[1]);

    const minValue = Math.min(...prices);
    const maxValue = Math.max(...prices);

    const width = 600;
    const height = 300;
    const padding = 40;
    const yScale = (height - 2 * padding) / (maxValue - minValue);
    const xScale = width / (labels.length - 1);

    // Dessiner les axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Dessiner les étiquettes sur l'axe X
    labels.forEach((label, index) => {
      ctx.fillText(label, padding + index * xScale, height - padding + 20);
    });

    // Dessiner les étiquettes sur l'axe Y
    const yStep = (maxValue - minValue) / 5;
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - i * (height - 2 * padding) / 5;
      ctx.fillText((minValue + i * yStep).toFixed(2), padding - 30, y);
    }

    // Dessiner la ligne du graphique
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (prices[0] - minValue) * yScale);
    prices.forEach((price, index) => {
      ctx.lineTo(padding + index * xScale, height - padding - (price - minValue) * yScale);
    });
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }, [cryptoData]);

  return (
    <div className="chart-container" ref={chartContainerRef}>
      <h2>Line Chart</h2>
    </div>
  );
};

export default Chart;
