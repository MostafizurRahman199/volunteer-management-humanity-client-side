import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import { useDarkMode } from "../../Context/DarkModeContext";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";

const AllPostForVolunteer = () => {
  const { darkMode } = useDarkMode();
  const { getVolunteerPosts } = ApiComponent();
  const navigate = useNavigate();

  // Search, filter, and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data using React Query
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["volunteerPosts"],
    queryFn: getVolunteerPosts,
  });

  // Handle search, filter, and sort logic
  const filteredPosts = posts
    ?.filter((post) => {
      const searchMatch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch =
        !selectedCategory || post.category === selectedCategory;
      return searchMatch && categoryMatch;
    })
    ?.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return new Date(b.deadline) - new Date(a.deadline);
    });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <div
      className={`p-6 max-w-6xl mx-auto `}
    >
      <h2 className="text-2xl font-semibold mb-6">Volunteer Need Posts</h2>

      {/* Search, Filter, Sort */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or location..."
          className="input input-bordered w-full md:w-1/3 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter by Category */}
        <select
          className="select select-bordered w-full md:w-1/4 text-black"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="education">Education</option>
          <option value="healthcare">Healthcare</option>
          <option value="social-service">Social Service</option>
          <option value="animal-welfare">Animal Welfare</option>
        </select>

        {/* Sort by Deadline */}
        <select
          className="select select-bordered w-full md:w-1/4 text-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Deadline (Ascending)</option>
          <option value="desc">Sort by Deadline (Descending)</option>
        </select>
      </div>

      {/* Responsive Grid for Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.map((post) => (
          <div
            key={post._id}
            className={`card   rounded-2xl p-4  border-gray-200 
                shadow-lg  overflow-hidden border transform hover:scale-105 transition-transform duration-300
                ${darkMode ? "text-white bg-[#1A1A1D]" : "text-gray-800 bg-white"}`}
          >
            {/* Thumbnail */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />

            {/* Title */}
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>

            {/* Location */}
            <p className="text-sm mb-2">
              <strong>Location:</strong> {post.location}
            </p>

            {/* Volunteers Needed */}
            <p className="text-sm mb-4">
              <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
            </p>

            {/* View Details Button */}
            <button
              className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white w-full"
              onClick={() => navigate(`/volunteer-post-details/${post._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPostForVolunteer;
