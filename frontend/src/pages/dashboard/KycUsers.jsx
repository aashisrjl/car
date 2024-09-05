import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography, Chip } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function KycUsers() {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("carToken");
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/kyc-table');
  }

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/kyc/getSingleKyc/66d033305524988d56f31989', {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        console.log("Full API Response:", response.data);
        if (response.data.kyc) {
          setKyc(response.data.kyc);
        } else {
          setError("Unexpected data structure from API");
        }
      } catch (error) {
        console.log('Error fetching KYC data', error);
        setError('Failed to fetch KYC data');
      } finally {
        setLoading(false);
      }
    };

    fetchKyc();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Typography color="red">{error}</Typography>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          KYC User Details
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["User Name", "Document Type", "Document Number", "Actions"].map((el) => (
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
            {kyc && (
              <tr>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    {kyc.userId.fullName}
                  </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {kyc.documentType}
                  </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {kyc.documentNumber}
                  </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Chip
                    variant="gradient"
                    color="green"
                    value="View More"
                    className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                    onClick={() => handleViewMore()}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default KycUsers;
