import React from 'react';
import UserTable from './UserTable.jsx';
import OrderTable from './OrderTable.jsx';
import KycTable from './KycTable.jsx';

export function Tables() {
  // Example data
  const users = [ /* Array of user objects */ ];
  const orders = [ /* Array of order objects */ ];
  const kycs = [ /* Array of KYC objects */ ];

  const handleApprove = (kycId) => {
    console.log(`Approve KYC ID: ${kycId}`);
  };

  const handleReject = (kycId) => {
    console.log(`Reject KYC ID: ${kycId}`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <UserTable users={users} />
      <OrderTable orders={orders} />
      <KycTable kycs={kycs} handleApprove={handleApprove} handleReject={handleReject} />
    </div>
  );
}

export default Tables;
