
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDarkMode } from "../../Context/DarkModeContext";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import Swal from "sweetalert2";
import { IoTimeOutline } from "react-icons/io5";
// import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { FaTag, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaUserTie } from "react-icons/fa";

const VolunteerPostDetails = () => {


  const { darkMode } = useDarkMode();
  const { user } = useFirebaseAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { getVolunteerPostById, postApplyVolunteer, decreaseVolunteerNeed } = ApiComponent();

  const [suggestion, setSuggestion] = useState("");

  // Fetch the specific post by ID using TanStack Query
  const { data: postDetails, isLoading, isError } = useQuery({
    queryKey: ["volunteerPost", id],
    queryFn: () => getVolunteerPostById(id),
  });
  
  // Mutation for submitting a volunteer request
  const volunteerRequestMutation = useMutation({
    mutationFn: async (requestData) => postApplyVolunteer(requestData),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Sent Successfully!",
        text: "You have successfully requested to volunteer.",
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Invalidate the query to refetch post details
      queryClient.invalidateQueries(["volunteerPost", id]);
    },
    onError: (error) => {
      console.error("Error submitting request:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed!",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "Okay",
      });
    },
  });
  




const decreaseVolunteerMutation = useMutation({
    mutationFn: async (postId) => {
      console.log("Decreasing volunteers for post ID:", postId);
      return decreaseVolunteerNeed(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["volunteerPost", id]);
      console.log("Volunteers needed decremented successfully.");
    },
    onError: (error) => {
      console.error("Error in decreaseVolunteerMutation:", error.message);
    },
  });
  

const handleOneModalCondition = () => {
    if (postDetails.volunteersNeeded == 0) {
        Swal.fire({
            icon: "error",
            title: "Request Failed!",
            text: "No volunteers needed for this post.",
            confirmButtonText: "Okay",
            });
    } else {
        document.getElementById("volunteer_modal").showModal();
    }
};

  const handleRequest = () => {
    const requestData = {
      thumbnail: postDetails.thumbnail,
      postTitle: postDetails.title,
      description: postDetails.description,
      category: postDetails.category,
      location: postDetails.location,
      volunteersNeeded: postDetails.volunteersNeeded,
      deadline: postDetails.deadline,
      organizerName: postDetails.organizerName,
      organizerEmail: postDetails.organizerEmail,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion,
      status: "requested",
      postId: postDetails._id,
      createdAt: new Date(),
    };
  
    console.log(requestData);
  
    // Store the request in the backend
    volunteerRequestMutation.mutate(requestData);
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong. Please try again later.</div>;

  return (

    <div
      className={`p-6 max-w-4xl mx-auto rounded-lg shadow-lg my-10${
        darkMode ? "bg-[#0D7C66] text-white" : " text-gray-800"
      }`}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-[#41B3A2]">{postDetails.title}</h2>
    
      {/* Thumbnail */}
      <img
        src={postDetails.thumbnail}
        alt={postDetails.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
    
      {/* Details Section */}
      <div className="space-y-4">
        {/* Description */}
        <div className="flex items-start">
          <FaCalendarAlt className="text-[#41B3A2] mt-1 mr-2" />
          <p className="text-lg">
            <strong className="font-semibold text-[#41B3A2]">Description:</strong>{" "}
            {postDetails.description}
          </p>
        </div>
    
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Category */}
  <div className={`flex items-center mb-4  rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`}>
    <IoTimeOutline className="text-[#41B3A2] mr-2 text-2xl"/>
    <div>
      <p className="text-lg font-semibold text-gray-700">Posted At</p>
      <p className="text-lg">{new Date(postDetails.createdAt).toLocaleString()}</p>
    </div>
  </div>

  <div className={`flex items-center mb-4  rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`}>
    <FaTag className="text-[#41B3A2] mr-2 text-2xl" />
    <div>
      <p className="text-lg font-semibold text-gray-700">Category</p>
      <p className="text-lg">{postDetails.category}</p>
    </div>
  </div>

  {/* Location */}
  <div className={`flex items-center mb-4  rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`}>
    <FaMapMarkerAlt className="text-[#41B3A2] mr-2 text-2xl" />
    <div>
      <p className="text-lg font-semibold text-gray-700">Location</p>
      <p className="text-lg">{postDetails.location}</p>
    </div>
  </div>

  {/* Volunteers Needed */}
  <div className={`flex items-center mb-4  rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`}>
    <FaUsers className="text-[#41B3A2] mr-2 text-2xl" />
    <div className="flex gap-2 items-center">
      <p className="text-lg font-semibold text-gray-700">Volunteers Needed : </p>
      <p className="text-2xl font-bold">{postDetails.volunteersNeeded}</p>
    </div>
  </div>

    {/* Organizer */}
    <div className={`flex items-center mb-4 bg-white rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`}>
    <FaUserTie className="text-[#41B3A2] mr-2 text-2xl" />
    <div>
      <p className="text-lg font-semibold text-gray-700">Organizer</p>
      <p className="text-lg">
        {postDetails.organizerName} ({postDetails.organizerEmail})
      </p>
    </div>
  </div>

  {/* Deadline */}
  <div className={`flex items-center mb-4 bg-white rounded-md shadow p-3 ${darkMode == true ? "bg-black/30" : ""}`} >
    <FaCalendarAlt className="text-[#41B3A2] mr-2 text-2xl" />
    <div>
      <p className="text-lg font-semibold text-gray-700">Deadline</p>
      <p className="text-lg">{new Date(postDetails.deadline).toDateString()}</p>
    </div>
  </div>


        </div>
      </div>
    
      {/* Be a Volunteer Button */}
      <button
        className="w-full mt-6 py-2 px-4 bg-[#41B3A2] text-white font-semibold rounded-lg hover:bg-[#0D7C66] transition-colors duration-300"
        onClick={handleOneModalCondition}
      >
        Be a Volunteer
      </button>
      <dialog id="volunteer_modal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
    <h3 className="font-bold text-2xl text-[#0D7C66] mb-4">Be a Volunteer</h3>

    <div className="py-4 bg-[#BDE8CA] rounded-lg p-4">
      {/* Thumbnail */}
      <div className="flex justify-center mb-4">
        <img
          src={postDetails.thumbnail}
          alt={postDetails.title}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-[#0D7C66]">Post Title:</span>
          <span className="ml-2 text-black">{postDetails.title}</span>
        </div>
        <div>
          <span className="font-semibold text-[#0D7C66] ">Description:</span>
          <span className=" flex text-justify text-black">{postDetails.description}</span>
        </div>
        <div>
          <span className="font-semibold text-[#0D7C66]">Category:</span>
          <span className="ml-2 text-black">{postDetails.category}</span>
        </div>
        <div>
          <span className="font-semibold text-[#0D7C66]">Location:</span>
          <span className="ml-2 text-black">{postDetails.location}</span>
        </div>
        <div>
          <span className="font-semibold text-[#0D7C66]">Volunteers Needed:</span>
          <span className="ml-2 text-black">{postDetails.volunteersNeeded}</span>
        </div>
        <div>
          <span className="font-semibold text-[#0D7C66]">Deadline:</span>
          <span className="ml-2 text-black">
            {new Date(postDetails.deadline).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-wrap">
          <span className="font-semibold text-[#0D7C66]">Organizer Name:</span>
          <span className="ml-2 text-black">{postDetails.organizerName}</span>
        </div>
        <div className="flex flex-wrap">
          <span className="font-semibold text-[#0D7C66]">Organizer Email:</span>
          <span className="sm:ml-2 text-black">{postDetails.organizerEmail}</span>
        </div>
      </div>
    </div>

    {/* Form Section */}
    <form onSubmit={(e) => e.preventDefault()} className="mt-6">
      {/* Volunteer Name */}
      <div className="mb-2">
        <label className="block text-lg font-medium text-[#0D7C66]">Your Name</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full text-black"
        />
      </div>

      {/* Volunteer Email */}
      <div className="mb-2">
        <label className="block text-lg font-medium text-[#0D7C66]">Your Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full text-black"
        />
      </div>

      {/* Suggestion */}
      <div className="mb-2">
        <label className="block text-lg font-medium text-[#0D7C66]">Suggestion</label>
        <textarea
          className="textarea textarea-bordered w-full text-black"
          placeholder="Add your suggestion..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        ></textarea>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-[#0D7C66]">Status</label>
        <input
          type="text"
          value="Requested"
          readOnly
          className="input input-bordered w-full bg-gray-200 cursor-not-allowed text-black"
        />
      </div>

      {/* Modal Actions */}
      <div className="modal-action flex justify-end">
        <button
          className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white"
          onClick={() => {
            handleRequest();
            document.getElementById("volunteer_modal").close();
          }}
        >
          Request
        </button>
        <button
          className="btn btn-outline text-red-800 hover:bg-red-800 border-2 hover:border-white border-red-800"
          type="button"
          onClick={() => document.getElementById("volunteer_modal").close()}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</dialog>
    </div>
    
  );
};

export default VolunteerPostDetails;
