import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography, Chip } from "@material-tailwind/react";

export function UserTable() { 
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("carToken");
  console.log(token)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/list', {
          headers: {
            Authorization: `${token}`, 
          },
          withCredentials: true,
        });

        setUsers(response.data.users); 
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching users', error);
      }
    };

    fetchUsers(); 
  }, [token]);

  return (
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          User Details
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Full Name", "Email", "Phone", "Role", "User Verified"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(({ fullName, email, phone, role, UserVerified }, key) => {
              const className = `py-3 px-5 ${
                key === users.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={email}>
                  <td className={className}>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      {fullName}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {email}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {phone}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {role}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Chip
                      variant="gradient"
                      color={UserVerified ? "green" : "red"}
                      value={UserVerified ? "Verified" : "Not Verified"}
                      className="py-0.5 px-2 text-[11px] font-medium w-fit"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default UserTable;
