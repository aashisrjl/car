import React, { createContext, useContext, useState } from 'react';

const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Anya Joshi",
      Address: "Kathmandu",
      PhoneNo: "1234567",
      card: '*******',
      expires: '12/24',
      Zip: '12345',
      image: "https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    },
    {
      id: 2,
      name: "John Doe",
      Address: "Kathmandu",
      PhoneNo: "9876543",
      card: '*******',
      expires: '12/24',
      Zip: '12345',
      image: "https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    },
  ]);

  const [cars, setCars] = useState([
    {
      id: 1,
      name: '2019 Lexus RX 350',
      image: 'https://imgs.search.brave.com/7IGHdqEHYgz7FdixPLPLgB4jQ30ISDdcudgIU-tb8_A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2Ftdi1wcm9k/LWNhZC1hc3NldHMu/czMuYW1hem9uYXdz/LmNvbS92ZGF0L3N1/Ym1vZGVscy9sZXh1/c19yeF9sZXh1cy1y/eDM1MF8yMDE5LTE2/NDMwNTkzOTYwMjYu/anBnP2ZpbGw9MTg6/MTEmcmVzaXplPTY0/MDoq',
      price: '$40,000'
    },
    {
      id: 2,
      name: '2020 Acura RDX',
      image: 'https://imgs.search.brave.com/sGH-sAtGrj_GN4zykJvpcvs3A2eN1IzOF9JHnz3KTDA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2FyZ3VydXMu/Y29tL2ltYWdlcy9m/b3JzYWxlLzIwMjQv/MDYvMTkvMjMvNTIv/MjAyMV9hY3VyYV9y/ZHgtcGljLTQyODU2/MjAyNzIyNTIwNjg3/NjMtMTAyNHg3Njgu/anBlZz9pbz10cnVl/JndpZHRoPTY0MCZo/ZWlnaHQ9NDgwJmZp/dD1ib3VuZHMmZm9y/bWF0PWpwZyZhdXRv/PXdlYnA',
      price: '$50,000'
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      dateOfOrder: '2024-08-25',
      carId: 1,
      price: '$40,000',
      delivered: true
    },
    {
      id: 2,
      dateOfOrder: '2024-08-26',
      carId: 2,
      price: '$50,000',
      delivered: false
    }
  ]);

  const getUserById = (id) => users.find((user) => user.id === id);
  const getCarById = (id) => cars.find((car) => car.id === id);
  const getOrderById = (id) => orders.find((order) => order.id === id);
  const getOrders = () => orders;

  return (
    <DetailContext.Provider value={{ users, getUserById, getCarById, getOrderById, getOrders }}>
      {children}
    </DetailContext.Provider>
  );
};

export const useDetailContext = () => useContext(DetailContext);
