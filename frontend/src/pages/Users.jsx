// src/components/UserDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailContext } from '../context/UseContext';
import Cars from './Cars';
import Orders from './Orders';
import UserCardDetails from './UserCardDetails'; // Import the new component

const UserDetail = () => {
  const { id } = useParams();
  const { getUserById } = useDetailContext();
  const user = getUserById(parseInt(id));

  if (!user) {
    return <div className='text-center text-red-600 font-semibold text-lg mt-4'>User not found</div>;
  }

  return (
    <>
    <div className='p-6  min-h-screen bg-slate-50 w-full'>
    <h1 className='text-3xl text-black p-2'>User`s Details</h1>

      <div className="flex flex-col  justify-between md:flex-row  shadow-lg rounded-lg p-6 mb-6 gap-6">

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.name}</h2>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Address:</span> {user.Address}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Phone:</span> {user.PhoneNo}
          </p>
          </div>

          <div className="image">
          <img src={user.image} alt={user.name} className="w-32 h-32 object-cover rounded-full border-4 border-gray-200" />
          </div>
      

      </div>
      <div className="cards">
      <UserCardDetails 
          card={user.card}
          expires={user.expires}
          zip={user.Zip}
        />
      </div>
      <div className="space-y-6">
        <Cars />
        <Orders />
      </div>
    </div>

    </>
  );
};

export default UserDetail;
