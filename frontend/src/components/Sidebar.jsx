import React from "react";

const Sidebar = () => {
  return (
    <div className="w-48 bg-slate-200 text-black min-h-screen p-4 md:w-80 lg:w-60 "
    style={{
      backgroundImage: `url('')`,
    }}>

      <div className="flex items-center gap-4 mb-6 p-2 mt-5 ml-2 hover:bg-slate-300 rounded-md transition-colors duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 text-red-400"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"></path>
        </svg>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>


      {/* <div className="flex items-center gap-4 mb-6 p-2 hover:bg-gray-700 rounded-md transition-colors duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 text-yellow-400"
        >
          <path d="M17 3.99998V2.0675C17 1.79136 17.2239 1.5675 17.5 1.5675C17.617 1.5675 17.7302 1.60851 17.8201 1.68339L21.9391 5.11587C22.1512 5.29266 22.1799 5.60794 22.0031 5.82008C21.9081 5.93407 21.7674 5.99998 21.619 5.99998H2V3.99998H17ZM2 18H22V20H2V18ZM2 11H22V13H2V11Z"></path>
        </svg>
        <h1 className="text-xl font-semibold">Orders</h1>
      </div> */}

      <div className="flex items-center gap-4 mb-6 p-2 ml-2 hover:bg-slate-300 rounded-md transition-colors duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 text-teal-400"
        >
          <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
        </svg>
        <h1 className="text-xl font-semibold">KYC</h1>
      </div>
    </div>
  );
};

export default Sidebar;
