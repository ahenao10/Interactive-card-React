import React from 'react';

const CardDisplay = ({ cardNumber, cardType }) => {
  // Format the card number with spaces
  const formattedNumber = cardNumber
    .replace(/\D/g, '') // Remove all non-digit characters
    .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
    .trim();

  return (
    <div className="w-full h-[200px] bg-[#1a237e] rounded-lg p-6 text-white relative">
      {/* Left side content */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div className="text-sm mb-2">Card Number</div>
        <div className="text-2xl font-bold">{formattedNumber}</div>
      </div>

      {/* Right side content */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className="text-sm mb-2">{cardType}</div>
        <div className="text-sm">12/25</div>
      </div>
    </div>
  );
};

export default CardDisplay;
