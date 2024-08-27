// src/components/Cars.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailContext } from '../context/UseContext';

const Cars = () => {
  const { id } = useParams();
  const { getCarById } = useDetailContext();

  const car = getCarById(parseInt(id));

  return (
    <>
      <h1 className="text-4xl mt-10 text-gray-900 mb-6 ml-3">User's Saved Cars</h1>
    
    
    <div className="max-w-md  mt-8 px-4 md:px-6 lg:px-8 ">
      {car ? (
        <div
          key={car.id}
          className="bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col items-center border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full max-w-md h-48 object-cover rounded-2xl shadow-md mb-4"
          />
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{car.name}</h3>
          <p className="text-lg font-semibold text-gray-600 mb-2">
            Price: <span className="text-green-600 text-xl">{car.price}</span>
          </p>

        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg font-medium">No car found</p>
      )}
    </div>
    </>
  );
};

export default Cars;