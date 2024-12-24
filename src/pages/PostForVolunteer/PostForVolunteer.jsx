import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../Context/DarkModeContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import Aos from "aos";
import postAnimation from "../../../public/postH.json";
import Lottie from "lottie-react";

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
    //   navigate("/");
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
    <div
      className={`${
        darkMode == true
          ? "bg-[#1a1919]"
          : "bg-gradient-to-br from-[#e3ffe7] to-[#d9e7ff]"
      } `}
    >
      <div
        className={`min-h-screen w-full sm:w-10/12 md:w-8/12  mx-auto py-10 flex flex-col lg:flex lg:flex-row items-center justify-center `}
      >
        <div
          data-aos="zoom-in"
          className={` p-8 md:pt-2 pb-16 md:px-16  ${
            darkMode == true
              ? " bg-black text-white"
              : "bg-white text-gray-800"
          } shadow-2xl sm:rounded-3xl w-full`}
        >
          <div className={`flex flex-col md:flex  md:flex-row items-center justify-start gap-1 `}>
            <div className="">
              <Lottie
                animationData={postAnimation}
                loop={true}
                className="w-[200px] md:h-[200px] "
              />
            </div>

           
              <h2
                className={`text-2xl md:text-4xl font-extrabold mb-4 ${"text-[#0D7C66]"}`}
              >
                Create Volunteer Post
              </h2>
           
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Thumbnail URL */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-semibold mb-2"
              >
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                id="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                placeholder="Enter thumbnail URL"
                required
              />
            </div>

            {/* Post Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold mb-2"
              >
                Post Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                placeholder="Enter post description"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-2"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
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
                className="block text-sm font-semibold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                placeholder="Enter location"
                required
              />
            </div>

            {/* Volunteers Needed */}
            <div>
              <label
                htmlFor="volunteersNeeded"
                className="block text-sm font-semibold mb-2"
              >
                Volunteers Needed
              </label>
              <input
                type="number"
                name="volunteersNeeded"
                id="volunteersNeeded"
                value={formData.volunteersNeeded}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                placeholder="Enter number of volunteers"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-semibold mb-2"
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
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41B3A2] focus:outline-none"
                required
              />
            </div>

            {/* Organizer Name */}
            <div>
              <label
                htmlFor="organizerName"
                className="block text-sm font-semibold mb-2"
              >
                Organizer Name
              </label>
              <input
                type="text"
                name="organizerName"
                value={formData.organizerName}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Organizer Email */}
            <div>
              <label
                htmlFor="organizerEmail"
                className="block text-sm font-semibold mb-2"
              >
                Organizer Email
              </label>
              <input
                type="email"
                name="organizerEmail"
                value={formData.organizerEmail}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#41B3A2] to-[#2C6E4F] text-white font-semibold rounded-lg hover:from-[#2C6E4F] hover:to-[#41B3A2] transition-colors duration-300"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForVolunteer;
