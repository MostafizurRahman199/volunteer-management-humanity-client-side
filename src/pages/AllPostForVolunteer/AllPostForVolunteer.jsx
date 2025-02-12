


import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import { useDarkMode } from "../../Context/DarkModeContext";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import Aos from "aos";
import { FaTh, FaList } from "react-icons/fa";

const AllPostForVolunteer = () => {
  const { darkMode } = useDarkMode();
  const { getVolunteerPosts } = ApiComponent();
  const navigate = useNavigate();
  const [viewFormat, setViewFormat] = useState("card");

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Fetch all posts
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["volunteerPosts"],
    queryFn: getVolunteerPosts,
  });

  // console.log(posts);

  // Filter, Search, and Sort logic
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

  // Pagination Logic
  const totalPosts = filteredPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = filteredPosts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const generatePaginationButtons = () => {
    const buttons = [];

    // Add "Previous" button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="btn btn-outline hover:bg-[#41b3a2] hover:text-white text-[#41b3a2]"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    // Add the first three page buttons
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          className={`btn ${currentPage === i ? "bg-[#41b3a2] text-white " : "btn-outline text-[#41b3a2] hover:bg-[#41b3a2]"}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add "..." if needed before current page
    if (currentPage > 4) {
      buttons.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    // Add current page button
    if (currentPage > 3 && currentPage <= totalPages - 3) {
      buttons.push(
        <button
          key={currentPage}
          className="btn bg-[#41b3a2] text-white "
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </button>
      );
    }

    // Add "..." if needed after current page
    if (currentPage < totalPages - 3) {
      buttons.push(<span key="end-ellipsis" className="px-2">...</span>);
    }

    // Add the last three page buttons
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      if (i > 3) {
        buttons.push(
          <button
            key={i}
            className={`btn ${
              currentPage === i ? "bg-[#41b3a2] text-white " : "btn-outline hover:bg-[#41b3a2]"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Add "Next" button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="btn btn-outline hover:bg-[#41b3a2] hover:text-white text-[#41b3a2]"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  if (isLoading) return <Loading height={"screen"} />;
  if (isError) return <ErrorPage />;

  return (
    <div className={`p-6 w-10/12 mx-auto min-h-screen`}>
      <h1 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
      Volunteer Need Posts
      </h1>


    


      {/* Search, Filter, and Sort */}
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

      {/* switch format card and table */}

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

<div>
  {viewFormat === "card" ? (
    <div className="grid grid-cols-1  md:grid-cols-3  gap-6">
      {paginatedPosts?.map((post) => (
        <div key={post._id} data-aos="fade-up">
          <div
            className={`card rounded-2xl p-4 border-gray-200 
              shadow-lg overflow-hidden  transform hover:scale-105 transition-transform duration-300
              ${darkMode ? "text-white bg-[#151414]" : "text-gray-800 bg-white"}`}
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{post.title.slice(0,25)}</h3>
            <p className="text-sm mb-2">
              <strong>Location:</strong> {post.location.slice(0,25)}
            </p>
            <p className="text-sm mb-4">
              <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
            </p>
            <button
              className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white w-full"
              onClick={() => navigate(`/volunteer-post-details/${post._id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow-lg">
        <thead
          className={`${darkMode ? "bg-[#1A1A1D] text-white" : "bg-gray-100 text-gray-800"}`}
        >
          <tr>
            <th className="px-4 py-2 border border-gray-200 text-[#41B3A2]">Thumbnail</th>
            <th className="px-4 py-2 border border-gray-200 text-[#41B3A2]">Title</th>
            <th className="px-4 py-2 border border-gray-200 text-[#41B3A2]">Location</th>
            <th className="px-4 py-2 border border-gray-200 text-[#41B3A2]">Volunteers Needed</th>
            <th className="px-4 py-2 border border-gray-200 text-[#41B3A2]">Action</th>
          </tr>
        </thead>
        <tbody
          className={`${darkMode ? "bg-[#1A1A1D] text-white" : "bg-white text-gray-800"}`}
        >
          {paginatedPosts?.map((post) => (
            <tr key={post._id} className={` ${darkMode === true ? "hover:bg-white/10" : "hover:bg-gray-100" } transition duration-300`}>
              <td className="px-4 py-2 border border-gray-200 ">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="rounded-lg w-32 h-24 object-cover mx-auto"
                />
              </td>
              <td className={`px-4 py-2 border border-gray-200 font-bold  ${darkMode === true ? "text-white" : "text-[#0D7C66]" }`}>{post.title.slice(0,25)}</td>
              <td className="px-4 py-2 border border-gray-200 ">{post.location.slice(0,25)}</td>
              <td className="px-4 py-2 border border-gray-200 text-center">{post.volunteersNeeded}</td>
              <td className="px-4 py-2 border border-gray-200 text-center">
                <button
                  className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/volunteer-post-details/${post._id}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {generatePaginationButtons()}
      </div>
    </div>
  );
};

export default AllPostForVolunteer;
