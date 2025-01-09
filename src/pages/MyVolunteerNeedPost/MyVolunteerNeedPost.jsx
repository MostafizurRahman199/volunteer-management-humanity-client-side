import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

// import { FaTh, FaList } from "react-icons/fa";
import ApiComponent from "../../API/ApiComponent";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import Aos from 'aos';
import { useDarkMode } from "../../Context/DarkModeContext";



const MyVolunteerNeedPost = ({viewFormat}) => {

  const { user } = useFirebaseAuth();
  const { darkMode } = useDarkMode();
  const email = user.email;
  const queryClient = useQueryClient();
  const {getVolunteerPostsByEmail,  deletePost, updateVolunteerPost } = ApiComponent();
 
 
  useEffect(() => {
    Aos.init({ duration: 1000 });
   
}, []);

//   const [viewFormat, setViewFormat] = useState("card"); // "card" or "table"

  const [selectedPost, setSelectedPost] = useState(null);




  // Fetch user-specific posts
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["myVolunteerPosts", email],
    queryFn: () => getVolunteerPostsByEmail(email),
  });

  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: async (id) => deletePost(id),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Post Deleted",
        text: "The post has been successfully deleted.",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["myVolunteerPosts", email]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while deleting the post.",
      });
    },
  });

  // Mutation for updating a post
  const updatePostMutation = useMutation({
    mutationFn: async (updatedData) => updateVolunteerPost(updatedData),
    onSuccess: () => {
        Swal.fire({
            icon: "success",
            title: "Post Updated",
            text: "The post has been successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
          queryClient.invalidateQueries(["myVolunteerPosts", email]);
    },
    onError: () => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while deleting the post.",
          });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate(selectedPost);
    // console.log(selectedPost);
    document.getElementById("update_modal").close();
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>

  
    posts?.length === 0 && (
      <p className="text-center text-gray-600">You have not posted any volunteer need posts yet.</p>
    )
  

  return (
    <div className="px-2 md:px-6">

    

   


      {/* Card Format */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.length > 0 ? (
            posts.map((post) => (
            <div data-aos="flip-up">
                  <div
                key={post._id}
                className={`${darkMode ? "text-white bg-[#151414]" : "text-gray-800 bg-[#BDE8CA]"}    p-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-[#0D7C66] mb-2">
                  {post.title}
                </h3>
                <p className="text-sm mb-2">
                  <strong>Category:</strong> {post.category}
                </p>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> {post.location}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-sm bg-[#41B3A2] hover:bg-[#0D7C66] text-white"
                    onClick={() => handleUpdate(post)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 hover:bg-red-800 text-white"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No posts found.</p>
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
                <th className="text-[#41B3A2]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.location}</td>
                    <td className="flex space-x-2">
                      <button
                        className="btn btn-sm bg-[#41B3A2] hover:bg-[#16a791] text-white"
                        onClick={() => handleUpdate(post)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm bg-red-500 hover:bg-red-800 text-white"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-600">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


 <dialog id="update_modal" className={`modal modal-bottom sm:modal-middle  `}>
  <form
    onSubmit={handleUpdateSubmit}
    className={`modal-box  rounded-lg p-6 ${darkMode ? "text-white bg-[#1A1A1D]" : "text-gray-800 bg-white"}`}
  >
    <h3 className="font-bold text-xl text-[#0D7C66] mb-4">
      Update Volunteer Need Post
    </h3>

    {/* Thumbnail */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Thumbnail URL
    </label>
    <input
      type="url"
      value={selectedPost?.thumbnail || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({ ...prev, thumbnail: e.target.value }))
      }
      className="input input-bordered text-black w-full mb-4"
      placeholder="Enter thumbnail URL"
      required
    />

    {/* Title */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Title
    </label>
    <input
      type="text"
      value={selectedPost?.title || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({ ...prev, title: e.target.value }))
      }
      className="input input-bordered text-black w-full mb-4"
      required
    />

    {/* Description */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Description
    </label>
    <textarea
      value={selectedPost?.description || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({ ...prev, description: e.target.value }))
      }
      className="textarea textarea-bordered w-full mb-4 text-black"
      placeholder="Enter post description"
      required
    ></textarea>

    {/* Category */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Category
    </label>
    <select
      value={selectedPost?.category || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({ ...prev, category: e.target.value }))
      }
      className="select select-bordered w-full mb-4 text-black"
      required
    >
      <option value="">Select a category</option>
      <option value="healthcare">Healthcare</option>
      <option value="education">Education</option>
      <option value="social-service">Social Service</option>
      <option value="animal-welfare">Animal Welfare</option>
    </select>

    {/* Location */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Location
    </label>
    <input
      type="text"
      value={selectedPost?.location || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({ ...prev, location: e.target.value }))
      }
      className="input input-bordered text-black w-full mb-4"
      placeholder="Enter location"
      required
    />

    {/* Volunteers Needed */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Volunteers Needed
    </label>
    <input
      type="number"
      value={selectedPost?.volunteersNeeded || ""}
      onChange={(e) =>
        setSelectedPost((prev) => ({
          ...prev,
          volunteersNeeded: Number(e.target.value),
        }))
      }
      className="input input-bordered text-black w-full mb-4"
      placeholder="Enter the number of volunteers needed"
      required
    />

    {/* Deadline */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
  Deadline
</label>
<input
  type="date"
  value={
    selectedPost?.deadline
      ? new Date(selectedPost?.deadline).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) =>
    setSelectedPost((prev) => ({
      ...prev,
      deadline: new Date(e.target.value).toISOString(),
    }))
  }
  className="input input-bordered text-black w-full mb-4"
  required
/>

    {/* Organizer Info */}
    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Organizer Name
    </label>
    <input
      type="text"
      value={selectedPost?.organizerName || ""}
      readOnly
      className="input input-bordered text-black w-full mb-4 bg-gray-200 cursor-not-allowed"
    />

    <label className="block text-sm font-medium text-[#0D7C66] mb-2">
      Organizer Email
    </label>
    <input
      type="email"
      value={selectedPost?.organizerEmail || ""}
      readOnly
      className="input input-bordered text-black w-full mb-4 bg-gray-200 cursor-not-allowed"
    />

    {/* Modal Actions */}
    <div className="modal-action flex justify-end space-x-4">
      <button type="submit" className="btn bg-[#41B3A2] text-white hover:bg-[#0D7C66]">
        Update
      </button>
      <button
        type="button"
        className="btn btn-outline text-[#0D7C66] border-[#0D7C66] hover:bg-[#f44336] hover:text-white border-2 hover:border-white"
        onClick={() => document.getElementById("update_modal").close()}
      >
        Close
      </button>
    </div>
  </form>
</dialog>
    </div>
  );
};

export default MyVolunteerNeedPost;
