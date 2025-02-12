import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Modal from "react-modal"; // Install this library if not already
import Lottie from "lottie-react";
import { useDarkMode } from "../../Context/DarkModeContext";
import { Link } from "react-router-dom";

const ContactInfo = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal
  const { darkMode } = useDarkMode();

  const handleLocationClick = () => {
    setShowLocation(!showLocation);
    setIsModalOpen(true); // Open the modal when the location is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full sm:w-10/12 mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      {/* Container for all cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Location Card */}
        <div className="bg-white shadow-md sm:rounded-2xl  p-6 flex flex-col items-center">
  <h3 className="text-xl font-semibold mb-4 text-[#0D7C66]">Our Location</h3>
  <div className="flex items-center mb-4">
    <FaMapMarkerAlt className="w-8 h-8 text-[#0D7C66]" />
    <p className="ml-3 text-lg">
      {showLocation ? "Dhaka, Bangladesh" : "Click to show location"}
    </p>
  </div>
  <button 
    className="bg-[#0D7C66] text-white py-2 px-4 rounded-md hover:bg-[#41B3A2]"
    onClick={() => window.open('https://maps.app.goo.gl/YTqMMyCZJtqhBUUg9', '_blank')}
  >
    Show Location
  </button>
</div>


        {/* Contact Info Card */}
        <div className="bg-white shadow-md sm:rounded-2xl  p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-[#0D7C66]">Contact Info</h3>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="w-8 h-8 text-[#0D7C66]" />
            <p className="ml-3 text-lg">+123 456 7890</p>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="w-8 h-8 text-[#0D7C66]" />
            <p className="ml-3 text-lg">info@argentsupport.com</p>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white shadow-md sm:rounded-2xl  p-6 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4 text-[#0D7C66]">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7C66] hover:text-[#41B3A2]"
            >
              <FaFacebook className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7C66] hover:text-[#41B3A2]"
            >
              <FaTwitter className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7C66] hover:text-[#41B3A2]"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </div>

      </div>

      {/* Modal to Show Map */}
      
    </div>
  );
};

export default ContactInfo;
