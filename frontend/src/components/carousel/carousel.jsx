import React from 'react';

const Carousel = ({ selectedCrypto, onSelectCrypto }) => {
  const cryptoAssets = ['bitcoin', 'ethereum', 'litecoin', 'ripple']; // Example list of crypto assets

  const handleCryptoChange = (crypto) => {
    onSelectCrypto(crypto);
  };

  return (
    <div className="carousel">
      {cryptoAssets.map((crypto, index) => (
        <button
          key={index}
          onClick={() => handleCryptoChange(crypto)}
          className={selectedCrypto === crypto ? 'selected' : ''}
        >
          {crypto}
        </button>
      ))}
    </div>
  );
};

export default Carousel;
