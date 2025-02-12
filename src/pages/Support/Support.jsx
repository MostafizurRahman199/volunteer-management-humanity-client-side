import React from "react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../Context/DarkModeContext";
import contactImage from "../../../public/contactboy.json";
import Lottie from "lottie-react";
import FAQ from "./FAQ";
import ApiComponent from "../../API/ApiComponent";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ContactInfo from "./ContactInfo";

const Support = () => {
  const { darkMode } = useDarkMode();
  const {MessagePost} = ApiComponent();



  const messageMutation = useMutation({
    mutationFn: (data) => MessagePost(data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Your message has been successfully shared.",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while sharing your experience.",
      });
    },
  });





  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log("Form Submitted:", data);
    messageMutation.mutate(data);
    reset();
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#1A3636] text-[#41B3A2]" : "text-[#0D7C66] bg-[#BDE8CA]"
      } flex flex-col items-center py-10`}
    >
      <h1 className="text-4xl font-bold mb-6">Support</h1>
      <p className="text-lg mb-10 text-center max-w-2xl">
        Need help or have any questions? We're here to assist you! Browse our FAQs, contact us directly, or fill out the form below.
      </p>
       
      {/* FAQs */}
     <FAQ></FAQ>

      {/* Contact Form with Image */}
      <div className="w-full sm:w-10/12 mx-auto bg-white shadow-md sm:rounded-2xl p-4 sm:p-6 md:p-12 flex flex-col-reverse lg:flex-row items-center">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-6 mb-6 lg:mb-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#0D7C66] mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#0D7C66] mb-2"
              >
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0D7C66] mb-2"
              >
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#0D7C66] mb-2"
              >
                Your Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                id="message"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
                rows="5"
                placeholder="Enter your message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0D7C66] text-white py-2 px-4 rounded-md hover:bg-[#41B3A2] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie animationData={contactImage} loop={true} />
        </div>
      </div>


      <ContactInfo></ContactInfo>
    </div>
  );
};

export default Support;
