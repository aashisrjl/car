import React from 'react';
import { Link } from 'react-router-dom';
import { useDetailContext } from '../context/UseContext.jsx';

const UserTable = () => {
  const { users } = useDetailContext();

  return (
    <div className="p-6 shadow-md rounded-lg flex-1">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <table className="w-full bg-slate-100 border border-gray-300 rounded-md table-fixed">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Phone</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{user.name}</td>
              <td className="py-3 px-4 border-b">{user.Address}</td>
              <td className="py-3 px-4 border-b">{user.PhoneNo}</td>
              <td className="py-3 px-4 border-b">
                <Link to={`/user/${user.id}`}>
                  <button className="bg-emerald-600 text-white py-1 px-3 rounded hover:bg-stone-500">
                    View More
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
