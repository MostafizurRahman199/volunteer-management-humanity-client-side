// import React from 'react'
// import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

// // import gamerLogo from "../assets/gamer3.png"
// // import jobLogo from "../assets/job_logo.png";
// import jobLogo from "../../public/humanity.png";

// const Footer = () => {
//   return (
//     <footer className="relative bg-gradient-to-r from-black to-[#151515]">

  

//       <div className="container mx-auto px-4 pt-16 pb-8">
    
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
        
//           <div className="space-y-4">
//           <div className='flex justify-start items-end'>
           
//           <img
//                 className="lg:block w-20"
//                 src={jobLogo}
//                 alt="Logo"
//               />
//             <h3 className="font_header text-4xl font-bold bg-clip-text text-transparent bg-white">
//              Humanity
//             </h3>
//           </div>
//             <p className="text-sm leading-relaxed">
//               This place is for Gamer Find authentic review about have and can make review and shortlisted his favorite one.
//             </p>

//           </div>
       
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Quick Links</h4>
//             <ul className="space-y-2">
//   {['Home', 'About Us', 'All Reviews', 'Login'].map((item) => (
//     <li key={item} className="relative group">
//       <a
//         href="#"
//         className="text-sm pl-4 relative block transition-all duration-200 hover:translate-x-2"
//       >
//         {/* Horizontal line */}
//         <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-4"></span>
//         {item}
//       </a>
//     </li>
//   ))}
// </ul>





//           </div>

       
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Contact Us</h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <FaMapMarkerAlt className="text-white" />
//                 <span className="text-sm">Dhaka, Bangladesh</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FaPhone className="text-white" />
//                 <span className="text-sm">+880 1234-567890</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FaEnvelope className="text-white" />
//                 <span className="text-sm">info@chillgamer.com</span>
//               </div>
//             </div>
//           </div>

    
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Newsletter</h4>
//             <p className="text-sm">Subscribe to get special offers and updates!</p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-700 w-full"
//               />
//               <button className="bg-black px-4 py-2 rounded-r-lg transition-colors duration-300">
//                 Join
//               </button>
//             </div>
//           </div>
//         </div>

    
//         <div className="flex justify-center space-x-6 mt-8">
//           {[
//             { icon: FaGithub, link: "https://github.com/MostafizurRahman199" },
//             { icon: FaLinkedin, link: "https://www.linkedin.com/in/md-mostafizur-rahman-78bb511a4/" },
//             { icon: FaTwitter, link: "https://x.com/Fardilshifat" }
//           ].map((social, index) => (
//             <a
//               key={index}
//               href={social.link}
//               className="transform hover:scale-110 transition-transform duration-300 text-gray-200  hover:text-white"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <social.icon size={24} />
//             </a>
//           ))}
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-white/20 mt-8 pt-8 text-center">
//           <p className="text-sm text-white flex items-center justify-center gap-1">
//             Made with <FaHeart className="text-red-500" /> by Job Seeker Team © {new Date().getFullYear()}
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer




// import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPhone,
// } from "react-icons/fa";
// import jobLogo from "../../public/humanity.png";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-b from-[#0D7C66] to-[#41B3A2] text-white">
//       <div className="container mx-auto px-6 py-12">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div>
//             <div className="flex items-center gap-4 mb-4">
//               <img src={jobLogo} alt="Logo" className="w-12 h-12" />
//               <h3 className="text-2xl font-bold">Humanity</h3>
//             </div>
//             <p className="text-sm leading-relaxed">
//               Humanity is a platform connecting volunteers and organizations to
//               create a positive impact. Join us to make a difference in
//               communities worldwide.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               {["Home", "Our Mission", "Get Involved", "Contact Us"].map(
//                 (item, idx) => (
//                   <li key={idx}>
//                     <a
//                       href="#"
//                       className="text-sm hover:underline hover:text-[#BDE8CA] transition-all duration-300"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Contact Section */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-3">
//                 <FaMapMarkerAlt />
//                 <span>Dhaka, Bangladesh</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaPhone />
//                 <span>+880 1234-567890</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaEnvelope />
//                 <span>support@humanity.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Newsletter Section */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
//             <p className="text-sm mb-4">
//               Subscribe to our newsletter to receive updates on upcoming events
//               and volunteer opportunities.
//             </p>
//             <form className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 rounded-l-md text-gray-700 focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="bg-[#0D7C66] px-4 py-2 rounded-r-md hover:bg-[#BDE8CA] text-white font-semibold transition-all duration-300"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-white/20 mt-8 pt-8"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-center text-sm">
//           {/* Social Media */}
//           <div className="flex gap-6 mb-4 lg:mb-0">
//             {[
//               { icon: FaFacebookF, link: "#" },
//               { icon: FaInstagram, link: "#" },
//               { icon: FaLinkedinIn, link: "#" },
//             ].map((social, idx) => (
//               <a
//                 key={idx}
//                 href={social.link}
//                 className="text-white hover:text-[#BDE8CA] transition-all duration-300"
//               >
//                 <social.icon size={20} />
//               </a>
//             ))}
//           </div>

//           {/* Copyright */}
//           <p className="text-center lg:text-right">
//             © {new Date().getFullYear()} Humanity | Empowering Communities
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import jobLogo from "../../public/humanity.png";
import { useDarkMode } from "../Context/DarkModeContext";

const Footer = () => {

const {darkMode} = useDarkMode();

  return (
    <footer className={`  relative  ${darkMode == true ? "bg-black/20 text-white" : "bg-[#0D7C66] text-white"}`}>
      {/* Background Overlap */}
      <div className="absolute top-0 left-0 w-full h-1/2 "></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-16">
        {/* Logo & About */}
        <div className="text-center mb-10">
          <img
            src={jobLogo}
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg"
          />
          <h2 className="text-3xl font-bold text-white">Humanity</h2>
          <p className="mt-4 text-sm text-white max-w-md mx-auto leading-relaxed">
            Join Humanity, a platform dedicated to connecting volunteers with
            meaningful opportunities. Empower communities and bring positive
            change.
          </p>
        </div>

        {/* Three Columns */}
        <div className="flex flex-wrap items-center justify-center gap-12 text-white">
          {/* Volunteer Opportunities */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Volunteer Opportunities</h3>
            <ul className="space-y-2">
              {["Education Programs", "Healthcare Drives", "Environmental Projects", "Community Support"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#BDE8CA] transition-colors duration-300 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope />
              <span>support@humanity.com</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Connected</h3>
            <p className="text-sm">
              Subscribe to receive updates on the latest events and projects.
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="w-full md:w-fit border-2  px-4 py-2 rounded-lg  font-semibold bg-[#0D7C66] text-white transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 flex justify-center gap-6">
          {[
            { icon: FaFacebookF, link: "#" },
            { icon: FaInstagram, link: "#" },
            { icon: FaLinkedinIn, link: "#" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              className="text-white hover:text-black hover:bg-[#BDE8CA] p-2 rounded-full bg-[#0D7C66] transition-all duration-300"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white">
          Made with ❤️ by Humanity Team © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
