import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../Context/DarkModeContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import postVolunteer from "../../../public/postVolunteer.json";
import Aos from 'aos';


const PostForVolunteer = () => {
  const { user } = useFirebaseAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const { postVolunteerNeed } = ApiComponent();

  const [formData, setFormData] = useState({
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


  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);

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
      navigate("/");
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
    onError: () => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      deadline: formData.deadline.toISOString(),
    };
    mutation.mutate(formattedFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
   <div className="w-full py-10 " 
   
//    style={{
//     backgroundImage: "url('https://img.freepik.com/premium-photo/black-girl-child-reaching-right-side-view_943281-37556.jpg')",
// //    style={{
// //     backgroundImage: "url('https://www.caringnetwork.com/wp-content/uploads/2023/01/10-Benefits-of-Volunteering-Your-Time-Regularly-2880w.webp')",


//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
  

//   }}
  
  
  >
     <div
     data-aos="zoom-in"
      className={`p-8 md:py-16 md:px-16 max-w-4xl mx-auto rounded-2xl  bg-[#0D7C66]/50 ${
        darkMode ? "text-white" : "text-gray-800"
      }  shadow-2xl`}
      
    >
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          darkMode ? "text-[#BDE8CA]" : "text-white"
        }`}
      >
        Add Volunteer Need Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Thumbnail URL */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium mb-2 text-white"
          >
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnail"
            id="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            placeholder="Enter thumbnail URL"
            required
          />
        </div>

        {/* Post Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 text-white"
          >
            Post Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            placeholder="Enter post description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium mb-2 text-white"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
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
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium mb-2 text-white"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Volunteers Needed */}
        <div>
          <label
            htmlFor="volunteersNeeded"
            className="block text-sm font-medium mb-2 text-white"
          >
            Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            id="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            placeholder="Enter number of volunteers"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium mb-2 text-white"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline.toISOString().split("T")[0]}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                deadline: new Date(e.target.value),
              }))
            }
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-[#41B3A2]"
            required
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label
            htmlFor="organizerName"
            className="block text-sm font-medium mb-2 text-white"
          >
            Organizer Name
          </label>
          <input
            type="text"
            name="organizerName"
            value={formData.organizerName}
            readOnly
            className="w-full px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Organizer Email */}
        <div>
          <label
            htmlFor="organizerEmail"
            className="block text-sm font-medium mb-2 text-white"
          >
            Organizer Email
          </label>
          <input
            type="email"
            name="organizerEmail"
            value={formData.organizerEmail}
            readOnly
            className="w-full px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="w-full py-3 bg-[#41B3A2] text-white font-semibold rounded-2xl hover:bg-[#0D7C66] transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
   </div>
  );
};

export default PostForVolunteer;












