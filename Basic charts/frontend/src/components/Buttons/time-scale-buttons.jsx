import React from 'react';

const TimeScaleButtons = ({ onSelectTimeScale }) => {
  const timeScales = ['Hour', 'Day', 'Week', 'Month']; // Exemple d'échelles de temps

  const handleButtonClick = (scale) => {
    onSelectTimeScale(scale); // Appeler la fonction de rappel avec l'échelle de temps sélectionnée
  };

  return (
    <div className="time-scale-buttons">
      {timeScales.map(scale => (
        <button key={scale} onClick={() => handleButtonClick(scale)}>
          {scale}
        </button>
      ))}
    </div>
  );
};

export default TimeScaleButtons;
