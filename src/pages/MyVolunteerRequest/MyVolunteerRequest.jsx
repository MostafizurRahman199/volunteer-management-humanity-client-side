import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaTh, FaList } from "react-icons/fa";
import ApiComponent from "../../API/ApiComponent";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import { data } from "autoprefixer";
import Aos from 'aos';


const MyVolunteerRequest = ({viewFormat}) => {
  const { user } = useFirebaseAuth();
  const { email } = user;
  const queryClient = useQueryClient();
  
  const {getVolunteerRequestsByEmail, cancelVolunteerRequest} = ApiComponent();

  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);

  // Fetch user-specific volunteer requests
  const { data: requests, isLoading, isError } = useQuery({
    queryKey: ["myVolunteerRequests", email],
    queryFn: () => getVolunteerRequestsByEmail(email),
  });

console.log(requests);

  // Mutation for canceling a volunteer request
  const cancelRequestMutation = useMutation({
    mutationFn: async (post) => cancelVolunteerRequest( post ),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Canceled",
        text: "The volunteer request has been successfully canceled.",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["myVolunteerRequests", email]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while canceling the request.",
      });
    },
  });

  const handleCancel = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRequestMutation.mutate(post);
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <div className="px-2 md:px-6">
 


      {/* Card Format */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.length > 0 ? (
            requests.map((request) => (
             <div data-aos="flip-up">
               <div
                key={request._id}
                className="p-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <img
                  src={request.thumbnail}
                  alt={request.postTitle}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="flex  items-center gap-2">
                <p className="text-lg font-bold text-[#0D7C66] mb-2">
                  {request.postTitle}
                </p>
                <p className={`${request.status == 'requested' && "bg-yellow-500 text-black"} 
                ${request.status == 'accepted' && "bg-green-500 text-white"} 
                ${request.status == 'rejected' && "bg-red-500 text-white"} 
                py-1 px-2 rounded-2xl text-sm`}>{request.status}</p>
                </div>
                <p className="text-sm mb-2">
                  <strong>Category:</strong> {request.category}
                </p>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> {request.location}
                </p>
                <p className="text-sm mb-2">
                  <strong>Deadline:</strong>{" "}
                  {new Date(request.deadline).toDateString()}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-sm bg-red-500 text-white"
                    onClick={() => handleCancel(request)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
             </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No requests found.</p>
          )}
        </div>
      )}

      {/* Table Format */}
      {viewFormat === "table" && (
        <div className="overflow-x-auto">
          <table data-aos="fade-up" className="table w-full">
            <thead>
              <tr>
                <th className="text-[#41B3A2]">Title</th>
                <th className="text-[#41B3A2]">Category</th>
                <th className="text-[#41B3A2]">Location</th>
                <th className="text-[#41B3A2]">Deadline</th>
                <th className="text-[#41B3A2]">Status</th>
                <th className="text-[#41B3A2]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests?.length > 0 ? (
                requests.map((request) => (
                  <tr  key={request._id} >

                    <td>{request.postTitle}</td>
                    <td>{request.category}</td>
                    <td>{request.location}</td>
                    <td>{new Date(request.deadline).toDateString()}</td>
                    <td> <p className={`${request.status == 'requested' && "bg-yellow-600 text-white"} 
                ${request.status == 'accepted' && "bg-green-500 text-white"} 
                ${request.status == 'rejected' && "bg-red-500 text-white"} 
                py-1 px-2 rounded-md text-sm w-fit`}>{request.status}</p></td>
                    <td className="flex space-x-2">
                      <button
                        className="btn btn-sm bg-red-500 text-white"
                        onClick={() => handleCancel(request)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-600">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerRequest;
