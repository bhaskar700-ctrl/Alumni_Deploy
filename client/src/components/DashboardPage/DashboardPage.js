import React from "react";
import UserProfileSummary from "./UserProfileSummary/UserProfileSummary";
import DashBoardEvents from "./DashboardEvents/DashBoardEvents";
import JobBoard from "./JobBoard/JobBoard";

const DashboardPage = () => {
  return (
    <>
      <div className="flex">
        <div className="w-full py-10">
          <div className="px-6 ">
            {/* Card code block start */}
            <UserProfileSummary/>
            {/* Card code block end */}
          </div>
        </div>

        <div className="flex items-center justify-center py-8 px-4">
          <div className="md:w-96 rounded-md shadow-lg p-5 text-gray-500 bg-white">
            <h1 className="pt-2 pb-7 text-gray-800  font-bold text-lg">
              Recent Updates
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-200">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card3-svg1.svg"
                    alt="cart"
                  />
                </div>
                <a
                  href="javascript:void(0)"
                  className="focus:outline-none focus:underline focus:text-gray-400 text-gray-600 hover:text-gray-500"
                >
                  <p className="text-sm font-medium pl-3">Order# IDO-214-152</p>
                </a>
              </div>
              <p className="text-sm font-medium text-indigo-700">$145</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-green-200">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card3-svg2.svg"
                    alt="message"
                  />
                </div>
                <a
                  href="javascript:void(0)"
                  className="focus:outline-none focus:underline focus:text-gray-400 text-gray-600 hover:text-gray-500"
                >
                  {" "}
                  <p className="text-sm font-medium pl-3">
                    New message from{" "}
                    <span className="text-blue-700">@Kelly190</span>
                  </p>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-200">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card3-svg1.svg"
                    alt="cart"
                  />
                </div>
                <a
                  href="javascript:void(0)"
                  className="focus:outline-none focus:underline focus:text-gray-400 text-gray-600  hover:text-gray-500"
                >
                  <p className="text-sm font-medium pl-3">Order# IDO-325-664</p>
                </a>
              </div>
              <p className="text-sm font-medium text-indigo-700">$205</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-green-200">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card3-svg3.svg"
                    alt="text"
                  />
                </div>
                <a
                  href="javascript:void(0)"
                  className="focus:outline-none focus:underline focus:text-gray-400 text-gray-600  hover:text-gray-500"
                >
                  <p className="text-sm font-medium pl-3">Invoice generated</p>
                </a>
              </div>
              <a
                href="javascript:void(0)"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 rounded-md focus:text-indigo-800 hover:text-indigo-800 text-indigo-700"
              >
                <p className="text-sm font-medium cursor-pointer">View</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full bg-white text-gray-500 shadow rounded">
        {/* Content on the left */}
       <DashBoardEvents/>
        <JobBoard/>
      </div>
    </>
  );
};

export default DashboardPage;
