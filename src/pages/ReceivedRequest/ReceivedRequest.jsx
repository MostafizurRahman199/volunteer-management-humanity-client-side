// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import ApiComponent from "../../API/ApiComponent";
// import { useFirebaseAuth } from "../../hooks/useAuth";

// const ReceivedRequest = () => {
//   const { user } = useFirebaseAuth();
//   const { email } = user;
//   const queryClient = useQueryClient();
//   const { getOrganizerPosts, getAppliedRequests, updateRequestStatus } = ApiComponent();

//   const [viewFormat, setViewFormat] = useState("card"); // Card or Table view

//   // Fetch organizer posts
//   const { data: posts, isLoading: loadingPosts } = useQuery({
//     queryKey: ["organizerPosts", email],
//     queryFn: () => getOrganizerPosts(email),
//   });

// //   console.log(posts);

//   // Fetch applied requests
//   const { data: appliedRequests, isLoading: loadingRequests } = useQuery({
//     queryKey: ["appliedRequests", posts],
//     queryFn: () => getAppliedRequests(posts?.map((post) => post._id)),
//     enabled: !!posts,
//   });

// //   console.log(appliedRequests);

//   // Mutation for updating request status
//   const updateRequestMutation = useMutation({
//     mutationFn: ({ id, status }) => {
//         // console.log("Id : ", id);
//         // console.log("Status:", status);
//         updateRequestStatus(id, status)},
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Request Updated",
//         text: "The request status has been updated successfully.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       queryClient.invalidateQueries(["appliedRequests"]);
//     },
//   });

//   const handleUpdateStatus = (id, status) => {
//     Swal.fire({
//       title: `Are you sure you want to ${status} this request?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: `Yes, ${status}`,
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateRequestMutation.mutate({ id, status });
//       }
//     });
//   };

//   if (loadingPosts || loadingRequests) return <div>Loading...</div>;

//   return (
//     <div className="p-6 w-full md:w-10/12 mx-auto min-h-screen">
//       <h2 className="text-3xl font-bold text-center text-[#0D7C66] mb-6">
//         Received Requests
//       </h2>

//       {/* View Switch */}
//       <div className="flex justify-end items-center mb-6">
//         <button
//           className={`btn btn-sm ${
//             viewFormat === "card" ? "bg-[#41B3A2] text-white" : "btn-outline text-[#41B3A2]"
//           }`}
//           onClick={() => setViewFormat("card")}
//         >
//           Card View
//         </button>
//         <button
//           className={`btn btn-sm ${
//             viewFormat === "table" ? "bg-[#41B3A2] text-white" : "btn-outline text-[#41B3A2]"
//           }`}
//           onClick={() => setViewFormat("table")}
//         >
//           Table View
//         </button>
//       </div>

//       {/* Card Format */}
//       {viewFormat === "card" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {appliedRequests?.map((request) => (
//             <div
//               key={request._id}
//               className="bg-white shadow-lg rounded-lg overflow-hidden border p-4"
//             >
//               <img
//                 src={request.thumbnail}
//                 alt={request.postTitle}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-bold text-[#0D7C66] mb-2">
//                 {request.postTitle}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 <strong>Volunteer:</strong> {request.volunteerName}
//               </p>
//               <p className="text-sm text-gray-600 mb-4">
//                 <strong>Status:</strong> {request.status}
//               </p>
//               <div className="flex justify-end">
//                 <button
//                   className="btn btn-sm bg-[#41B3A2] text-white"
//                   onClick={() => handleUpdateStatus(request._id, "accepted")}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="btn btn-sm bg-red-500 text-white"
//                   onClick={() => handleUpdateStatus(request._id, "rejected")}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Table Format */}
//       {viewFormat === "table" && (
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Post Title</th>
//                 <th>Volunteer</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appliedRequests?.map((request) => (
//                 <tr key={request._id}>
//                   <td>{request.postTitle}</td>
//                   <td>{request.volunteerName}</td>
//                   <td>{request.status}</td>
//                   <td className="flex space-x-2">
//                     <button
//                       className="btn btn-sm bg-[#41B3A2] text-white"
//                       onClick={() => handleUpdateStatus(request._id, "accepted")}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="btn btn-sm bg-red-500 text-white"
//                       onClick={() => handleUpdateStatus(request._id, "rejected")}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReceivedRequest;



import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ApiComponent from "../../API/ApiComponent";
import { useFirebaseAuth } from "../../hooks/useAuth";

const ReceivedRequest = () => {
  const { user } = useFirebaseAuth();
  const { email } = user;
  const queryClient = useQueryClient();
  const { getOrganizerPosts, getAppliedRequests, updateRequestStatus } = ApiComponent();

  const [viewFormat, setViewFormat] = useState("card"); // Card or Table view

  // Fetch organizer posts
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["organizerPosts", email],
    queryFn: () => getOrganizerPosts(email),
  });

  // Fetch applied requests
  const { data: appliedRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ["appliedRequests", posts],
    queryFn: () => getAppliedRequests(posts?.map((post) => post._id)),
    enabled: !!posts,
  });

  // Filter only requests with "requested" status
  const filteredRequests = appliedRequests?.filter((request) => request.status === "requested");

  // Mutation for updating request status
  const updateRequestMutation = useMutation({
    mutationFn: ({ id, status }) => updateRequestStatus(id, status),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Updated",
        text: "The request status has been updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["appliedRequests"]); // Re-fetch applied requests
    },
  });

  const handleUpdateStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestMutation.mutate({ id, status });
      }
    });
  };

  if (loadingPosts || loadingRequests) return <div>Loading...</div>;

  return (
    <div className="p-6 w-full md:w-10/12 mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#0D7C66] mb-6">
        Received Requests
      </h2>

      {/* View Switch */}
      <div className="flex justify-end items-center mb-6">
        <button
          className={`btn btn-sm ${
            viewFormat === "card" ? "bg-[#41B3A2] text-white" : "btn-outline text-[#41B3A2]"
          }`}
          onClick={() => setViewFormat("card")}
        >
          Card View
        </button>
        <button
          className={`btn btn-sm ${
            viewFormat === "table" ? "bg-[#41B3A2] text-white" : "btn-outline text-[#41B3A2]"
          }`}
          onClick={() => setViewFormat("table")}
        >
          Table View
        </button>
      </div>

      {/* Card Format */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests?.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border p-4"
            >
              <img
                src={request.thumbnail}
                alt={request.postTitle}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-[#0D7C66] mb-2">
                {request.postTitle}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Volunteer:</strong> {request.volunteerName}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Status:</strong> {request.status}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="btn btn-sm bg-[#41B3A2] text-white"
                  onClick={() => handleUpdateStatus(request._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm bg-red-500 text-white"
                  onClick={() => handleUpdateStatus(request._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Format */}
      {viewFormat === "table" && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Volunteer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests?.map((request) => (
                <tr key={request._id}>
                  <td>{request.postTitle}</td>
                  <td>{request.volunteerName}</td>
                  <td>{request.status}</td>
                  <td className="flex space-x-2">
                    <button
                      className="btn btn-sm bg-[#41B3A2] text-white"
                      onClick={() => handleUpdateStatus(request._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 text-white"
                      onClick={() => handleUpdateStatus(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceivedRequest;

