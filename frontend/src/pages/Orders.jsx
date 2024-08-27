// src/components/Orders.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailContext } from '../context/UseContext';

const Orders = () => {
  const { id } = useParams();
  const { getOrderById } = useDetailContext();
  const order = getOrderById(parseInt(id));

  if (!order) {
    return (
      <div className='text-center text-gray-600 text-lg font-medium mt-8'>
        No order found
      </div>
    );
  }

  return (
    <div className='mt-10 px-4 md:px-6 lg:px-8'>
      <h1 className='text-4xl  text-gray-900 mb-6'>User's Order Details</h1>
      <div className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Detail
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Information
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Date of Order
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {order.dateOfOrder}
              </td>
            </tr>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Car ID
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {order.carId}
              </td>
            </tr>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Price
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                ${order.price}
              </td>
            </tr>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Delivered
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {order.delivered ? 'Yes' : 'No'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
