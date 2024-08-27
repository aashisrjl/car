// src/components/UserCardDetails.jsx

import React from 'react';

const UserCardDetails = ({ card, expires, zip }) => {
  return (
    <>
        <h1 className='text-3xl text-black p-2  '>Card Details</h1>
       
    <div className="bg-zinc-100 p-4 rounded-lg shadow-md">
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Card:</span> {card}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Expires:</span> {expires}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Zip:</span> {zip}
      </p>
    </div>
    </>
  );
};

export default UserCardDetails;
