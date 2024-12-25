import React, { useState } from "react";
import MyVolunteerNeedPost from "../MyVolunteerNeedPost/MyVolunteerNeedPost";
import MyVolunteerRequest from "../MyVolunteerRequest/MyVolunteerRequest";
import { useDarkMode } from "../../Context/DarkModeContext";
import { FaTh, FaList } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa"; // Import the icon

const ManageMyPostRequest = () => {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("request");
  const [viewFormat, setViewFormat] = useState("table");

  return (
    <div className="w-full px-2 md:w-10/12 mx-auto min-h-screen my-10">
   
      {/* View Switch */}

      <h2 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">Manage Your Post/Request</h2>
      
      <div className="flex justify-end items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`btn btn-sm ${
              viewFormat === "card"
                ? "bg-[#41B3A2] text-white"
                : "btn-outline text-[#41B3A2]"
            }`}
            onClick={() => setViewFormat("card")}
          >
            <FaTh className="mr-2" /> Card View
          </button>
          <button
            className={`btn btn-sm ${
              viewFormat === "table"
                ? "bg-[#41B3A2] text-white"
                : "btn-outline text-[#41B3A2]"
            }`}
            onClick={() => setViewFormat("table")}
          >
            <FaList className="mr-2" /> Table View
          </button>
        </div>
      </div>

      {/* Custom Tab Navigation */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {/* My Post Tab */}

        <button
          onClick={() => setActiveTab("needPost")}
          className={`px-6 py-2 text-sm md:text-xl font-bold rounded-t-lg ${
            activeTab === "needPost"
              ? "bg-[#41B3A2] text-white"
              : darkMode
              ? "text-[#BDE8CA] border-b-2 border-transparent hover:border-[#41B3A2]"
              : "text-[#0d7c66] border-b-2 border-transparent hover:border-[#0d7c66]"
          }`}
        >
          My Volunteer Need Post
        </button>

        {/* My Request Tab */}
        <button
          onClick={() => setActiveTab("request")}
          className={`px-2 md:px-6 py-2 text-sm md:text-xl font-bold rounded-t-lg flex flex-col sm:flex sm:flex-row gap-2 items-center ${
            activeTab === "request"
              ? "bg-[#41B3A2] text-white"
              : darkMode
              ? "text-[#BDE8CA] border-b-2 border-transparent hover:border-[#41B3A2]"
              : "text-[#0d7c66] border-b-2 border-transparent hover:border-[#0d7c66]"
          }`}
        >
          My Sent Request <FaPaperPlane className="" /> 
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "needPost" && (
          <div className="p-2 md:p-10 overflow-x-auto">
            <MyVolunteerNeedPost viewFormat={viewFormat} />
          </div>
        )}
        {activeTab === "request" && (
          <div className="p-2 md:p-10 overflow-x-auto">
            <MyVolunteerRequest  viewFormat={viewFormat}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMyPostRequest;
