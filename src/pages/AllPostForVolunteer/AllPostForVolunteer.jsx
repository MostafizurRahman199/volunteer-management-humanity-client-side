// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import ApiComponent from "../../API/ApiComponent";
// import { useDarkMode } from "../../Context/DarkModeContext";
// import Loading from "../../components/Loading/Loading";
// import ErrorPage from "../../components/Error.jsx/ErrorPage";
// import Aos from 'aos';


// const AllPostForVolunteer = () => {
//   const { darkMode } = useDarkMode();
//   const { getVolunteerPosts } = ApiComponent();
//   const navigate = useNavigate();

//   // Search, filter, and sort states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");


//   useEffect(() => {
//     Aos.init({ duration: 1000 });
// }, []);


//   // Fetch data using React Query
//   const { data: posts, isLoading, isError } = useQuery({
//     queryKey: ["volunteerPosts"],
//     queryFn: getVolunteerPosts,
//   });

//   // Handle search, filter, and sort logic
//   const filteredPosts = posts
//     ?.filter((post) => {
//       const searchMatch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchTerm.toLowerCase());
//       const categoryMatch =
//         !selectedCategory || post.category === selectedCategory;
//       return searchMatch && categoryMatch;
//     })
//     ?.sort((a, b) => {
//       if (sortOrder === "asc") {
//         return new Date(a.deadline) - new Date(b.deadline);
//       }
//       return new Date(b.deadline) - new Date(a.deadline);
//     });

//   if (isLoading) return <Loading height={'screen'}></Loading>;
//   if (isError) return <ErrorPage></ErrorPage>;

//   return (
//     <div
//       className={`p-6 max-w-6xl mx-auto min-h-screen`}
//     >
//       <h2 className="text-2xl font-semibold mb-6">Volunteer Need Posts</h2>

//       {/* Search, Filter, Sort */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by title or location..."
//           className="input input-bordered w-full md:w-1/3 text-black"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Filter by Category */}
//         <select
//           className="select select-bordered w-full md:w-1/4 text-black"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           <option value="education">Education</option>
//           <option value="healthcare">Healthcare</option>
//           <option value="social-service">Social Service</option>
//           <option value="animal-welfare">Animal Welfare</option>
//         </select>

//         {/* Sort by Deadline */}
//         <select
//           className="select select-bordered w-full md:w-1/4 text-black"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Sort by Deadline (Ascending)</option>
//           <option value="desc">Sort by Deadline (Descending)</option>
//         </select>
//       </div>

//       {/* Responsive Grid for Posts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPosts?.map((post) => (
//          <div  data-aos="fade-up">
//            <div
//             key={post._id}
//             className={`card   rounded-2xl p-4  border-gray-200 
//                 shadow-lg  overflow-hidden border transform hover:scale-105 transition-transform duration-300
//                 ${darkMode ? "text-white bg-[#1A1A1D]" : "text-gray-800 bg-white"}`}
//           >
//             {/* Thumbnail */}
//             <img
//               src={post.thumbnail}
//               alt={post.title}
//               className="rounded-lg w-full h-48 object-cover mb-4"
//             />

//             {/* Title */}
//             <h3 className="text-lg font-bold mb-2">{post.title}</h3>

//             {/* Location */}
//             <p className="text-sm mb-2">
//               <strong>Location:</strong> {post.location}
//             </p>

//             {/* Volunteers Needed */}
//             <p className="text-sm mb-4">
//               <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
//             </p>

//             {/* View Details Button */}
//             <button
//               className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white w-full"
//               onClick={() => navigate(`/volunteer-post-details/${post._id}`)}
//             >
//               View Details
//             </button>
//           </div>
//          </div>
//         ))}
//       </div>
//     </div>
//   );
// };
//  export default AllPostForVolunteer;



// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import ApiComponent from "../../API/ApiComponent";
// import { useDarkMode } from "../../Context/DarkModeContext";
// import Loading from "../../components/Loading/Loading";
// import ErrorPage from "../../components/Error.jsx/ErrorPage";
// import Aos from "aos";

// const AllPostForVolunteer = () => {
//   const { darkMode } = useDarkMode();
//   const { getVolunteerPosts } = ApiComponent();
//   const navigate = useNavigate();

//   // States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 9;

//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);

//   // Fetch all posts
//   const { data: posts, isLoading, isError } = useQuery({
//     queryKey: ["volunteerPosts"],
//     queryFn: getVolunteerPosts,
//   });

//   // Filter, Search, and Sort logic
//   const filteredPosts = posts
//     ?.filter((post) => {
//       const searchMatch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchTerm.toLowerCase());
//       const categoryMatch =
//         !selectedCategory || post.category === selectedCategory;
//       return searchMatch && categoryMatch;
//     })
//     ?.sort((a, b) => {
//       if (sortOrder === "asc") {
//         return new Date(a.deadline) - new Date(b.deadline);
//       }
//       return new Date(b.deadline) - new Date(a.deadline);
//     });

//   // Check if search, filter, or sort is active
//   const isFiltered =
//     searchTerm.trim() !== "" || selectedCategory !== "" || sortOrder !== "asc";

//   // Pagination Logic (only when no search/filter/sort is applied)
//   const totalPosts = filteredPosts?.length || 0;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);
//   const paginatedPosts = isFiltered
//     ? filteredPosts
//     : filteredPosts?.slice(
//         (currentPage - 1) * postsPerPage,
//         currentPage * postsPerPage
//       );

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   if (isLoading) return <Loading height={"screen"} />;
//   if (isError) return <ErrorPage />;

//   return (
//     <div className={`p-6 max-w-6xl mx-auto min-h-screen`}>
//       <h2 className="text-2xl font-semibold mb-6">Volunteer Need Posts</h2>

//       {/* Search, Filter, and Sort */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by title or location..."
//           className="input input-bordered w-full md:w-1/3 text-black"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Filter by Category */}
//         <select
//           className="select select-bordered w-full md:w-1/4 text-black"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           <option value="education">Education</option>
//           <option value="healthcare">Healthcare</option>
//           <option value="social-service">Social Service</option>
//           <option value="animal-welfare">Animal Welfare</option>
//         </select>

//         {/* Sort by Deadline */}
//         <select
//           className="select select-bordered w-full md:w-1/4 text-black"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Sort by Deadline (Ascending)</option>
//           <option value="desc">Sort by Deadline (Descending)</option>
//         </select>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedPosts?.map((post) => (
//           <div key={post._id} data-aos="fade-up">
//             <div
//               className={`card rounded-2xl p-4 border-gray-200 
//                 shadow-lg overflow-hidden border transform hover:scale-105 transition-transform duration-300
//                 ${darkMode ? "text-white bg-[#1A1A1D]" : "text-gray-800 bg-white"}`}
//             >
//               {/* Thumbnail */}
//               <img
//                 src={post.thumbnail}
//                 alt={post.title}
//                 className="rounded-lg w-full h-48 object-cover mb-4"
//               />

//               {/* Title */}
//               <h3 className="text-lg font-bold mb-2">{post.title}</h3>

//               {/* Location */}
//               <p className="text-sm mb-2">
//                 <strong>Location:</strong> {post.location}
//               </p>

//               {/* Volunteers Needed */}
//               <p className="text-sm mb-4">
//                 <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
//               </p>

//               {/* View Details Button */}
//               <button
//                 className="btn bg-[#41B3A2] hover:bg-[#0D7C66] text-white w-full"
//                 onClick={() => navigate(`/volunteer-post-details/${post._id}`)}
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {!isFiltered && (
//         <div className="flex justify-center items-center gap-4 mt-6">
//           <button
//             className="btn btn-outline"
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`btn ${
//                 currentPage === index + 1 ? "bg-[#41b3a2] text-white " : "btn-outline"
//               }`}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="btn btn-outline"
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPostForVolunteer;



import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import { useDarkMode } from "../../Context/DarkModeContext";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import Aos from "aos";

const AllPostForVolunteer = () => {
  const { darkMode } = useDarkMode();
  const { getVolunteerPosts } = ApiComponent();
  const navigate = useNavigate();

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
    <div className={`p-6 max-w-6xl mx-auto min-h-screen`}>
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

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts?.map((post) => (
          <div key={post._id} data-aos="fade-up">
            <div
              className={`card rounded-2xl p-4 border-gray-200 
                shadow-lg overflow-hidden border transform hover:scale-105 transition-transform duration-300
                ${darkMode ? "text-white bg-[#1A1A1D]" : "text-gray-800 bg-white"}`}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-sm mb-2">
                <strong>Location:</strong> {post.location}
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {generatePaginationButtons()}
      </div>
    </div>
  );
};

export default AllPostForVolunteer;
