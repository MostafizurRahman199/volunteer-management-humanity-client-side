// import React, { useEffect } from 'react';
// // import { useFirebaseAuth } from '../Auth/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import Aos from 'aos';
// import Lottie from 'lottie-react';
// import fireAnimation from "../../public/fire.json";
// import frame from "../../public/frame.json";
// import { useFirebaseAuth } from '../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import ApiComponent from '../API/ApiComponent';

// const getProfileImage = (user) => {
//   return user?.photoURL || 
//          user?.providerData?.[0]?.photoURL || 
//          'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
// };

// const Profile = () => {
//     const { user} = useFirebaseAuth();
//     const {getVolunteerPostsByEmail, getOrganizerPosts, getAppliedRequests,getVolunteerRequestsByEmail} = ApiComponent();
//     const navigate = useNavigate();

//     const handleUpdateClick = () => {
//         navigate('/update-profile');
//     };

//     useEffect(() => {
//         Aos.init({ duration: 1000 });
//     }, []);

    
//   const style = {
//     height: 250,
//   };

//   const { data: posts, isLoading, isError } = useQuery({
//     queryKey: ["myVolunteerPosts", user?.email],
//     queryFn: () => getVolunteerPostsByEmail(user?.email),
//   });

//   const { data: posts2, isLoading: loadingPosts } = useQuery({
//     queryKey: ["organizerPosts", user?.email],
//     queryFn: () => getOrganizerPosts(user?.email),
//   });

//   // Fetch applied requests
//   const { data: appliedRequests, isLoading: loadingRequests } = useQuery({
//     queryKey: ["appliedRequests", posts2],
//     queryFn: () => getAppliedRequests(posts2?.map((post) => post._id)),
//     enabled: !!posts2,
//   });

//   const { data: requests } = useQuery({
//     queryKey: ["myVolunteerRequests", user?.email],
//     queryFn: () => getVolunteerRequestsByEmail(user?.email),
//   });
  

//     return (
    

//         <div className={`min-h-screen  ` } >
           
       
//             <div className="md:pt-2 md:px-4 min-h-screen w-full flex flex-col justify-center items-center gap-2 ">
              
//               <div className='bg-[#151515] w-full sm:w-8/12 shadow-2xl shadow-[#41b3a2] sm:rounded-2xl' data-aos='zoom-in'>
//               <div className='flex flex-col items-center justify-center gap-2 px-4   md:px-6 py-4' >
//                 <h1 className="font_header text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center ">Welcome To Your Profile <br /> 
//                 </h1>
//                 <p className='font_header text-white text-center'>Manage your profile and updates effortlessly</p>
//                </div>

//                 <div className="relative w-full sm:w-8/12 lg:w-5/12 mx-auto  rounded-2xl p-4 md:p-8 mt-4 " data-aos="zoom-in">
//                     <div className="flex flex-col items-center">

//                         <div className='absolute -top-8'>
//                         <Lottie
//                             animationData={frame}
//                             style={style}
//                             />
//                           </div>


//                         <div className="w-fit rounded-full p-1 bg-gradient-to-r from-[#151515] to-[#41b3a2]" data-aos="zoom-in">
//                             <img
//                                 src={getProfileImage(user)}
//                                 alt="Profile"
//                                 className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
//                                 onError={(e) => {
//                                     e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
//                                     e.target.onerror = null;
//                                 }}
//                             />
//                         </div>

//                         <h1 className="text-2xl font-bold mb-2 text-center text-[#41b3a2] my-8">{user?.displayName}</h1>
//                         <p>Total Post : {posts.length}</p>
//                         <p>Received Request : {appliedRequests?.length}</p>
//                         <p>Sent Request : {requests?.length}</p>
//                         <p className="text-gray-600 mb-4">{user?.email}</p>

//                         <button
//                             onClick={handleUpdateClick}
//                             className="bg-[#41b3a2] hover:bg-[#9c1631] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
//                         >
//                             Update Profile
//                         </button>
//                     </div>
//                 </div>
//               </div>
//             </div>
//         </div>
//     );
// };

// export default Profile; 




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import Lottie from "lottie-react";
import fireAnimation from "../../public/fire.json";
import frame from "../../public/frame2.json";
import { useFirebaseAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ApiComponent from "../API/ApiComponent";
import { useDarkMode } from "../Context/DarkModeContext";

const getProfileImage = (user) => {
  return (
    user?.photoURL ||
    user?.providerData?.[0]?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
};

const Profile = () => {
    const {darkMode} = useDarkMode();
  const { user } = useFirebaseAuth();
  const {
    getVolunteerPostsByEmail,
    getOrganizerPosts,
    getAppliedRequests,
    getVolunteerRequestsByEmail,
  } = ApiComponent();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["myVolunteerPosts", user?.email],
    queryFn: () => getVolunteerPostsByEmail(user?.email),
    enabled: !!user?.email,
  });

  const { data: organizerPosts = [] } = useQuery({
    queryKey: ["organizerPosts", user?.email],
    queryFn: () => getOrganizerPosts(user?.email),
    enabled: !!user?.email,
  });

  const { data: appliedRequests = [] } = useQuery({
    queryKey: ["appliedRequests", organizerPosts],
    queryFn: () => getAppliedRequests(organizerPosts?.map((post) => post._id)),
    enabled: organizerPosts.length > 0,
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["myVolunteerRequests", user?.email],
    queryFn: () => getVolunteerRequestsByEmail(user?.email),
    enabled: !!user?.email,
  });

  const handleUpdateClick = () => {
    navigate("/update-profile");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center bg-gradient-to-br from-[#BDE8CA] to-[#41B3A2]`}
    >
      <div
        className={`w-11/12 md:w-8/12 lg:w-6/12 shadow-lg rounded-md p-8 ${darkMode == true ? "bg-black" : "bg-white "}`}
        data-aos="zoom-in"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D7C66] mb-2">
            Welcome to Your Profile
          </h1>
          <p className="text-gray-600">Manage your profile and updates effortlessly</p>
        </div>

        {/* Profile Section */}
        <div className="relative mt-6">
          {/* Decorative Frame */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Lottie animationData={frame} style={{ height: 200, width: 200 }} />
          </div>
          {/* Profile Picture */}
          {/* <div className="w-fit mx-auto p-1 bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-full"> */}
          <div className="w-fit mx-auto p-1 ">
            <img
              src={getProfileImage(user)}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32  object-cover border-4 border-white"
            />
          </div>
          {/* User Details */}
          <div className="text-center mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D7C66]">
              {user?.displayName}
            </h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
          {[
            { label: "Total Posts", value: posts?.length },
            { label: "Received Requests", value: appliedRequests?.length },
            { label: "Sent Requests", value: requests?.length },
          ].map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-[#41B3A2] text-white w-28 h-28 rounded-md shadow-md"
            >
              <p className="text-xl font-bold">{value}</p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpdateClick}
            className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white px-6 py-3 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
