// // import React, { useEffect, useState } from "react";
// // import { useFirebaseAuth } from "../../hooks/useAuth";
// // import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// // import ApiComponent from "../../API/ApiComponent";
// // import Swal from "sweetalert2";
// // import Loading from "../../components/Loading/Loading";
// // import ErrorPage from "../../components/Error.jsx/ErrorPage";

// // const MySavedPost = () => {
// //   const { user } = useFirebaseAuth();
// //   const email = user?.email;
// //   const queryClient = useQueryClient();
// //   const { getSavedPosts, deleteSavedPost } = ApiComponent();

// //   // Fetch Saved Posts
// //   const { data: savedPosts, isLoading, isError } = useQuery({
// //     queryKey: ["savedPosts", email],
// //     queryFn: () => getSavedPosts(email),
// //     enabled: !!email,
// //   });

// //   // Delete Mutation
// //   const deleteMutation = useMutation({
// //     mutationFn: async (postId) => deleteSavedPost(postId, email),
// //     onSuccess: () => {
// //       Swal.fire({
// //         icon: "success",
// //         title: "Deleted!",
// //         text: "The post has been removed from your saved list.",
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });
// //       queryClient.invalidateQueries(["savedPosts", email]);
// //     },
// //     onError: (error) => {
// //       console.error("Error deleting saved post:", error.message);
// //       Swal.fire({
// //         icon: "error",
// //         title: "Delete Failed",
// //         text: error.message,
// //       });
// //     },
// //   });

// //   // Handle Delete
// //   const handleDelete = (postId) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         deleteMutation.mutate(postId);
// //       }
// //     });
// //   };

// //   if (isLoading) return <Loading />;
// //   if (isError) return <ErrorPage />;

// //   return (
// //     <div className="w-10/12 mx-auto p-6 min-h-screen">
// //       <h2 className="text-3xl font-bold text-[#41B3A2] text-center mb-6">
// //         My Saved Posts
// //       </h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {savedPosts.length === 0 ? (
// //           <p className="text-center text-gray-500">No saved posts found.</p>
// //         ) : (
// //           savedPosts.map((post) => (
// //             <div
// //               key={post._id}
// //               className="relative bg-white rounded-lg shadow-md "
// //             >
// //               {/* Delete Button */}
// //               <button
// //                 className="btn btn-circle absolute -top-5 -right-4   text-white rounded-full p-2 "
// //                 onClick={() => handleDelete(post._id)}
// //               >
// //                 ❌
// //               </button>

// //               {/* Thumbnail */}
// //               <img
// //                 src={post.thumbnail}
// //                 alt={post.postTitle}
// //                 className="w-full h-40 object-cover"
// //               />

// //               {/* Post Info */}
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold text-[#151515] mb-2">
// //                   {post.postTitle}
// //                 </h3>
// //                 <button
// //                   className="btn btn-sm bg-[#41B3A2] text-white hover:scale-105 transition-all duration-300 w-full"
// //                   onClick={() => {
// //                     window.location.href = `/volunteer-post-details/${post.postId}`;
// //                   }}
// //                 >
// //                   See Details
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MySavedPost;



// const MySavedPost = () => {
//   const { user } = useFirebaseAuth();
//   const email = user?.email;
//   const queryClient = useQueryClient();
//   const { getSavedPosts, deleteSavedPost } = ApiComponent();

//   // Fetch Saved Posts
//   const { data: savedPosts, isLoading, isError } = useQuery({
//     queryKey: ["savedPosts", email],
//     queryFn: () => getSavedPosts(email),
//     enabled: !!email,
//   });

//   // Delete Mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (postId) => deleteSavedPost(postId, email),
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "The post has been removed from your saved list.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       queryClient.invalidateQueries(["savedPosts", email]);
//     },
//     onError: (error) => {
//       console.error("Error deleting saved post:", error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text: error.message,
//       });
//     },
//   });

//   // Handle Delete
//   const handleDelete = (postId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#A91D3A",
//       cancelButtonColor: "#0D7C66",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(postId);
//       }
//     });
//   };

//   if (isLoading) return <Loading />;
//   if (isError) return <ErrorPage />;

//   return (
//     <div className="w-10/12 mx-auto p-6 min-h-screen">
//       <h2 className="text-3xl font-bold text-[#41B3A2] text-center mb-6">
//         My Saved Posts
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {savedPosts.length === 0 ? (
//           <p className="text-center text-gray-500">No saved posts found.</p>
//         ) : (
//           savedPosts.map((post) => (
//             <div
//               key={post._id}
//               className="relative bg-gradient-to-br from-[#BDE8CA] to-[#0D7C66] text-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
//             >
//               {/* Delete Button */}
//               <button
//                 className="absolute top-4 right-4 bg-[#A91D3A] text-white rounded-full p-2 hover:bg-[#0D7C66] shadow-md"
//                 onClick={() => handleDelete(post._id)}
//               >
//                 ❌
//               </button>

//               {/* Thumbnail */}
//               <img
//                 src={post.thumbnail}
//                 alt={post.postTitle}
//                 className="w-full h-40 object-cover"
//               />

//               {/* Post Info */}
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2 text-[#151515]">
//                   {post.postTitle}
//                 </h3>
//                 <button
//                   className="w-full py-2 bg-[#41B3A2] text-white font-semibold rounded-md shadow-md hover:bg-[#0D7C66] transition-all duration-300"
//                   onClick={() => {
//                     window.location.href = `/volunteer-post-details/${post.postId}`;
//                   }}
//                 >
//                   See Details
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MySavedPost;


import React from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import { Link } from "react-router-dom";

const MySavedPost = () => {
  const { user } = useFirebaseAuth();
  const email = user?.email;
  const queryClient = useQueryClient();
  const { getSavedPosts, deleteSavedPost } = ApiComponent();

  // Fetch Saved Posts
  const { data: savedPosts, isLoading, isError } = useQuery({
    queryKey: ["savedPosts", email],
    queryFn: () => getSavedPosts(email),
    enabled: !!email,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (postId) => deleteSavedPost(postId, email),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The post has been removed from your saved list.",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["savedPosts", email]);
    },
    onError: (error) => {
      console.error("Error deleting saved post:", error.message);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message,
      });
    },
  });

  // Handle Delete
  const handleDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A91D3A",
      cancelButtonColor: "#0D7C66",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(postId);
      }
    });
  };

  if (isLoading) return <Loading height="screen" />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-10/12 mx-auto p-2 md:p-6 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
        My Saved Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No saved posts found.</p>
        ) : (
          savedPosts.map((post) => (
            <Link to={`/volunteer-post-details/${post.postId}`} key={post._id}>
            <div className="relative h-56 flex flex-col justify-between bg-gradient-to-br text-[#41B3A2] rounded-lg shadow-lg transition-transform transform hover:scale-105">
              {/* Thumbnail with Overlay */}
              <div className="relative group">
                <img
                  src={post.thumbnail}
                  alt={post.postTitle}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                  <span className="text-white text-lg font-semibold">View Details</span>
                </div>
              </div>
          
              {/* Post Info */}
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#41B3A2]">
                    {post.postTitle.slice(0,18)}..
                  </h3>
                </div>
              </div>
          
              {/* Delete Button */}
              <button
                className="absolute -top-4 -right-2 md:-right-4 bg-white text-[#A91D3A] rounded-full p-2 hover:bg-[#0D7C66] hover:text-white shadow-md"
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation on delete
                  handleDelete(post._id);
                }}
              >
                ❌
              </button>
            </div>
          </Link>
          
          ))
        )}
      </div>
    </div>
  );
};

export default MySavedPost;
