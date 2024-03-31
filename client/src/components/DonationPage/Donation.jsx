import React, { useState } from 'react';

const Donation = () => {
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardSide, setCardSide] = useState('front');

  const formatCardNumber = (value) => {
    // Format card number as needed
    // Implement your logic here
    return value;
  };

  const isValid = () => {
    // Validate form fields
    // Implement your validation logic here
    return true; // For demo purposes
  };

  const handleSubmit = () => {
    // Handle form submission
    alert(`You did it ${cardholder}.`);
  };

  return (
    <div className="m-4">
      {/* Credit card form */}
      <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        {/* Header */}
        <header className="flex flex-col justify-center items-center">
          {/* Front of the card */}
          <div className="relative" style={{ display: cardSide === 'front' ? 'block' : 'none' }}>
            <img className="w-full h-auto" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png" alt="front credit card" />
            {/* Front card details */}
            <div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
              <p className="number mb-5 sm:text-xl">{cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'}</p>
              <div className="flex flex-row justify-between">
                <p>{cardholder !== '' ? cardholder : 'Card holder'}</p>
                <div>
                  <span>{expirationMonth}</span>
                  <span>{expirationMonth !== '' && '/'}</span>
                  <span>{expirationYear}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="relative" style={{ display: cardSide === 'back' ? 'block' : 'none' }}>
            <img className="w-full h-auto" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png" alt="" />
            {/* Back card details */}
            <div className="bg-transparent text-white text-xl w-full flex justify-end absolute bottom-20 px-8 sm:bottom-24 right-0 sm:px-12">
              <div className="border border-white w-16 h-9 flex justify-center items-center">
                <p>{securityCode !== '' ? securityCode : 'code'}</p>
              </div>
            </div>
          </div>
          {/* Card logos */}
          <ul className="flex">
            <li className="mx-2">
              <img className="w-16" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png" alt="" />
            </li>
            <li className="mx-2">
              <img className="w-14" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png" alt="" />
            </li>
            <li className="ml-5">
              <img className="w-7" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png" alt="" />
            </li>
          </ul>
        </header>
        {/* Main content */}
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">Card payment</h1>
          <div>
            {/* Form fields */}
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card holder"
                maxLength="22"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength="19"
              />
            </div>
            <div className="my-3 flex flex-col">
              <div className="mb-2">
                <label htmlFor="" className="text-gray-700">Expired</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Expiry month */}
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                >
                  <option value="" selected disabled>MM</option>
                  {/* Options for months */}
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month < 9 ? `0${month + 1}` : month + 1}>{month < 9 ? `0${month + 1}` : month + 1}</option>
                  ))}
                </select>
                {/* Expiry year */}
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                >
                  <option value="" selected disabled>YY</option>
                  {/* Options for years */}
                  {[...Array(6).keys()].map((index) => (
                    <option key={index + 2021} value={index + 2021}>{index + 2021}</option>
                  ))}
                </select>
                {/* Security code */}
                <input
                  type="text"
                  className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="Security code"
                  maxLength="3"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  onFocus={() => setCardSide('back')}
                  onBlur={() => setCardSide('front')}
                />
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="mt-6 p-4">
          <button
            className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
            disabled={!isValid()}
            onClick={handleSubmit}
          >
            Pay now
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Donation;
