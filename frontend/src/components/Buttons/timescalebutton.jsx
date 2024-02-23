import React from 'react';

const TimeScaleButtons = ({ onSelectTimeScale }) => {
  const timeScales = ['Hour', 'Day', 'Week', 'Month']; // Exemple d'échelles de temps

  return (
    <div className="time-scale-buttons">
      {timeScales.map(scale => (
        <button key={scale} onClick={() => onSelectTimeScale(scale)}>
          {scale}
        </button>
      ))}
    </div>
  );
};

export default TimeScaleButtons;
