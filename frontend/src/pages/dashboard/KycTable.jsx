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
  const [kyc, setKyc] = useState(null);
  const [error, setError] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const getKyc = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/kyc/getSingleKyc/66d033305524988d56f31989', {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        console.log("Full API Response in Table:", response.data);
        if (response.data.kyc) {
          setKyc(response.data.kyc);
        } else {
          setError("Unexpected data structure from API");
        }
      } catch (error) {
        console.log('Error fetching KYC data', error);
        setError('Failed to fetch KYC data');
      }
    };

    getKyc();
  }, [token]);

  const handleRejectionSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/user/kyc/reject/${kyc._id}`, { rejectionReason }, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      });
      // Handle successful rejection submission
      console.log('Rejection reason submitted successfully');
    } catch (error) {
      console.log('Error submitting rejection reason', error);
      // Handle error
    }
  };

  const headers = [
    "userId", "yourPhoto", "dob", "gender", "documentType", 
    "documentNumber", "documentImage", "currentAddress", 
    "permanentAddress", "fatherName", "motherName", 
    "maritalStatus", "occupation", "status", "rejectionReason"
  ];

  if (error) return <p className="text-red-500">{error}</p>;

  if (!kyc) return <p>Loading...</p>;

  return (

    <div className='ml-32 mt-10 flex justify-center'>
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
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  KYC Details
                </Typography>
              </th>
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
                <td className="border-b border-blue-gray-50 py-3 px-5">
                  <Typography variant="small" color="blue-gray" className="font-semibold bg">
                    {(() => {
                      if (header === 'userId') {
                        return (
                          <div>
                            <p>{kyc.userId.fullName}</p>
                            <p>{kyc.userId.email}</p>
                            <p>{kyc.userId.phone}</p>
                          </div>
                        );
                      }
                      const value = kyc[header];
                      if (typeof value === 'object' && value !== null) {
                        return JSON.stringify(value); // Convert object to string
                      }
                      if (header === 'status') {
                        return (
                          <Chip
                            variant="gradient"
                            color={
                              value === "approved"
                                ? "green"
                                : value === "rejected"
                                ? "red"
                                : "yellow"
                            }
                            value={value}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        );
                      }
                      if (header === 'yourPhoto' || header === 'documentImage') {
                        return (
                          <img 
                            src={`http://localhost:3000/path/to/images/${value}`} 
                            alt={header} 
                            className="h-10 w-10 rounded-full"
                          />
                        );
                      }
                      return value;
                    })()}
                  </Typography>
                </td>
                {header === 'status' && (
                  <td rowSpan={headers.length} className="border-b border-blue-gray-50 py-3 px-5  mr-80">
                    <div className="flex flex-col gap-2 mr-[100vh]">
                      <Button
                        variant="gradient"
                        color="green"
                        size="sm"
                        className="mb-1"
                        onClick={() => handleApprove(kyc._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="gradient"
                        color="red"
                        size="sm"
                        onClick={() => handleReject(kyc._id)}
                      >
                        Reject
                      </Button>
                      {header === 'status' && (
                        <div className="mt-4 ">
                          <input 
                            type="text" 
                            placeholder="Enter rejection reason" 
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                          />
                          <Button
                            variant="gradient"
                            color="red"
                            size="sm"
                            className="mt-2"
                            onClick={handleRejectionSubmit}
                          >
                            Submit Rejection
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
    </div>
  );
}

export default KycTable;
