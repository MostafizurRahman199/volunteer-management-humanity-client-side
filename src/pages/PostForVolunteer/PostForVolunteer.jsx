import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../Context/DarkModeContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";

const PostForVolunteer = () => {
  const { user } = useFirebaseAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const { postVolunteerNeed } = ApiComponent();

  const [formData, setFormData] = useState({
    thumbnail: "", // URL instead of file
    title: "",
    description: "",
    category: "",
    location: "",
    volunteersNeeded: "",
    deadline: new Date(),
    organizerName: user.displayName || "",
    organizerEmail: user.email || "",
    createdAt: new Date(),
  });

  // Mutation to handle form submission
  const mutation = useMutation({
    mutationFn: (newPost) => postVolunteerNeed(newPost),
    onSuccess: () => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Volunteer need post added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to another page (optional)
      navigate("/");

      // Reset the form
      setFormData({
        thumbnail: "",
        title: "",
        description: "",
        category: "",
        location: "",
        volunteersNeeded: "",
        deadline: new Date(),
        organizerName: user.displayName || "",
        organizerEmail: user.email || "",
        createdAt: new Date(),
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      deadline: formData.deadline.toISOString(), // Convert date to ISO format
    };
    console.log(formattedFormData);
    mutation.mutate(formattedFormData);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className={`p-6 max-w-3xl mx-auto bg-${
        darkMode ? "gray-800 text-white" : "white"
      } rounded-lg shadow-lg my-10`}
    >
      <h2 className="text-2xl font-semibold mb-4">Add Volunteer Need Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Thumbnail URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="thumbnail">
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnail"
            id="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter thumbnail URL"
            required
          />
        </div>

        {/* Post Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            placeholder="Enter post description"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social-service">Social Service</option>
            <option value="animal-welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter location"
            required
          />
        </div>

        {/* No. of Volunteers Needed */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="volunteersNeeded"
          >
            No. of Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            id="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter number of volunteers"
            required
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="deadline">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline.toISOString().split("T")[0]} // Format date to YYYY-MM-DD
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                deadline: new Date(e.target.value),
              }))
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Organizer Info */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Organizer Name
          </label>
          <input
            type="text"
            value={formData.organizerName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Organizer Email
          </label>
          <input
            type="email"
            value={formData.organizerEmail}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn ${
            darkMode ? "btn-secondary" : "btn-primary"
          } w-full`}
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default PostForVolunteer;
