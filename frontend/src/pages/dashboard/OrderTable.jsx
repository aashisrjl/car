import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function OrderTable({ orders }) {
  return (
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Order Details
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Order ID", "Total Amount", "Order Date", "Status"].map((el) => (
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
            {orders.map(({ _id, totalAmount, orderDate, status }, key) => {
              const className = `py-3 px-5 ${
                key === orders.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={_id}>
                  <td className={className}>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      {_id}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      ${totalAmount}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {new Date(orderDate).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {status}
                    </Typography>
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

export default OrderTable;
