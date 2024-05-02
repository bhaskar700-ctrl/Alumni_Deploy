import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function Donation() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your logic for handling form submission (e.g., sending payment)
    console.log('Payment details submitted:', amount, recipient);
    // Clear form fields after submission
    setAmount('');
    setRecipient('');
  };
  
  return (
    <div className='w-full flex flex-col items-center'>
    <div className='p-5 border-2 border-sky-500 rounded  shadow-lg shadow-cyan-500/50' >
      <h2 className='text-center block mb-2'>Make a Payment</h2>
      <div>
        {/* QR Code for payment */}
        <QRCode value={`Recipient: ${recipient}, Amount: ${amount}`} />
      </div>
      <div className='mt-6'>
        {/* Payment form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold">Amount:</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Transaction id:</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600 transition duration-300 mt-3'>Submit Payment</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Donation;
