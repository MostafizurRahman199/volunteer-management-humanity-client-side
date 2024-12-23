import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ApiComponent from "../../API/ApiComponent";
import { div } from "motion/react-client";
import { useDarkMode } from "../../Context/DarkModeContext";
import reviewNew from "../../../public/reviewNew.json"
import Lottie from "lottie-react";
import Aos from 'aos';

const ShakeYourWorkExperience = () => {
  const { user } = useFirebaseAuth();
  const { postWorkExperience } = ApiComponent(); 
  const {darkMode} = useDarkMode();

  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);


  const [formData, setFormData] = useState({
    title: "",
    description:"",
    yourImageURL: "",
    profession: "",
    workingImageURL: "",
    name: user?.displayName || "",
    email: user?.email || "",
    createdAt: new Date().toISOString(),
  });

  const mutation = useMutation({
    mutationFn: (data) => postWorkExperience(data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Work Experience Shared!",
        text: "Your work experience has been successfully shared.",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setFormData({
        title: "",
        description:"",
        yourImageURL: "",
        profession: "",
        workingImageURL: "",
        name: user?.displayName || "",
        email: user?.email || "",
        createdAt: new Date().toISOString(),
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while sharing your experience.",
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  
    mutation.mutate(formData);
  };

  return (
    <div className={`w-full  ${darkMode == true ? "bg-[#1A3636]" : "bg-[#BDE8CA]"}`}>
      <div className="w-10/12 mx-auto py-10 p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
        Share Your Work Experience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Left Side: Form */}
        <form  data-aos="zoom-in-right" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          
        <div>
            <label className="block text-sm font-medium text-[#0D7C66]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly={!!user}
              onChange={handleInputChange}
              className={`input input-bordered w-full text-black rounded-2xl ${
                user ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0D7C66]">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full text-black rounded-2xl"
              required
            />
          </div>
         
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0D7C66]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full text-black rounded-2xl"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0D7C66]">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="input input-bordered w-full text-black rounded-2xl"
              placeholder="Enter your profession"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0D7C66]">
              Your Image URL
            </label>
            <input
              type="url"
              name="yourImageURL"
              value={formData.yourImageURL}
              onChange={handleInputChange}
              className="input input-bordered w-full text-black rounded-2xl"
              placeholder="Enter your image URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0D7C66]">
              Working Image URL
            </label>
            <input
              type="url"
              name="workingImageURL"
              value={formData.workingImageURL}
              onChange={handleInputChange}
              className="input input-bordered w-full text-black rounded-2xl"
              placeholder="Enter a working image URL"
              required
            />
          </div>
          
       
         <div className="flex items-center">
         <button
            type="submit"
            className="btn w-full bg-[#41B3A2] hover:bg-[#0D7C66] text-white"
          >
            Share Experience
          </button>
         </div>
        </form>

        {/* Right Side: Image Preview */}
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={reviewNew} loop={true} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShakeYourWorkExperience;
