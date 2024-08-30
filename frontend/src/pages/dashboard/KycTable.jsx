import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import axios from 'axios';
const token = localStorage.getItem("carToken");
export function KycTable({ handleApprove, handleReject }) {
  const [kyc, setKyc] = useState([]);

  useEffect(() => {
    const getKyc = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/kyc/getAllKyc/', {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });
        // Check if response.data.kycs is an array
        setKyc(Array.isArray(response.data.kycs) ? response.data.kycs : []);
      } catch (error) {
        console.log('KYC error', error);
      }
    };
  
    getKyc();
  }, [token]);
  

  const headers = [
    "userId", "yourPhoto", "dob", "gender", "documentType", 
    "documentNumber", "documentImage", "currentAddress", 
    "permanentAddress", "fatherName", "motherName", 
    "maritalStatus", "occupation", "status", "rejectionReason"
  ];

  return (
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          KYC Details
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Fields
                </Typography>
              </th>
              {kyc.map((_, index) => (
                <th key={index} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                    KYC {index + 1}
                  </Typography>
                </th>
              ))}
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
  {headers.map((header, rowIndex) => (
    <tr key={rowIndex}>
      <td className="border-b border-blue-gray-50 py-3 px-5">
        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
          {header}
        </Typography>
      </td>
      {(kyc || []).map((kycData, key) => (
        <td key={key} className="border-b border-blue-gray-50 py-3 px-5">
          <Typography variant="small" color="blue-gray" className="font-semibold">
            {header === 'status' ? (
              <Chip
                variant="gradient"
                color={
                  kycData[header] === "approved"
                    ? "green"
                    : kycData[header] === "rejected"
                    ? "red"
                    : "yellow"
                }
                value={kycData[header]}
                className="py-0.5 px-2 text-[11px] font-medium w-fit"
              />
            ) : header === 'yourPhoto' || header === 'documentImage' ? (
              <img src={kycData[header]} alt={header} className="h-10 w-10 rounded-full"/>
            ) : (
              kycData[header]
            )}
          </Typography>
        </td>
      ))}
      {rowIndex === 0 && (
        <td rowSpan={headers.length} className="border-b border-blue-gray-50 py-3 px-5 align-top">
          <div className="flex flex-col gap-2">
            {(kyc || []).map((kycData, key) => (
              <div key={key} className="mb-2">
                <Button
                  variant="gradient"
                  color="green"
                  size="sm"
                  className="mb-1"
                  onClick={() => handleApprove(kycData._id)}
                >
                  Approve
                </Button>
                <Button
                  variant="gradient"
                  color="red"
                  size="sm"
                  onClick={() => handleReject(kycData._id)}
                >
                  Reject
                </Button>
              </div>
            ))}
          </div>
        </td>
      )}
    </tr>
  ))}
</tbody>

        </table>
      </CardBody>
    </Card>
  );
}

export default KycTable;
