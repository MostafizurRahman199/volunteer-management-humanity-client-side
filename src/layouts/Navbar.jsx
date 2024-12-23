
import React, { useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
// import { useFirebaseAuth } from '../Auth/AuthProvider';
import { FaHome,  FaUser, FaUserPlus, FaSignInAlt, } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '../assets/logoNav.png'
import { Tooltip, Button } from "@material-tailwind/react";
import { MdAddBox } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';
import { IoGameControllerOutline } from 'react-icons/io5';
import DarkModeToggle from '../components/Home/DarkModeToggle';
import gamerLogo from "../assets/gamer3.png"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { VscGitStashApply } from "react-icons/vsc";
import 'react-tooltip/dist/react-tooltip.css';
import JobLogo from "../assets/job_logo.png";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { useFirebaseAuth } from '../hooks/useAuth';
import { useDarkMode } from '../Context/DarkModeContext';



const Navbar = () => {

  
  // ___________________________hooks
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const { user, logOut, loading } = useFirebaseAuth();
  const navigate = useNavigate();
  const {darkMode} = useDarkMode()
  
  




  // ___________________________useEffect update activeLink

  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);




  // ___________________________loading check

  if (loading) {
    return <div className="h-16" />; 
  }




  // ___________________________link style helper

  // const getLinkStyle = (path) => `
  //   relative px-2  py-2 text-sm font-medium transition-colors duration-200
  //   ${activeLink === path 
  //     ? 'text-[#41b3a2]' 
  //     : 'text-gray-700 hover:text-[#41b3a2]'
  //   }
  //   before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
  //   before:bg-[#41b3a2] before:transform before:scale-x-0 before:transition-transform
  //   before:duration-300 hover:before:scale-x-100
  //   ${activeLink === path ? 'before:scale-x-100' : ''}
  // `;


    const getLinkStyle = (path) => `
    relative px-2 py-2 text-sm font-bold  font_header transition-colors duration-200
    ${activeLink === path ? 'text-[#41b3a2]' : `${darkMode == true ? "text-white" : "text-black"} hover:text-[#41b3a2]`}
    before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
    before:bg-[#41b3a2] before:transform before:scale-x-0 before:transition-transform
    before:duration-300 hover:before:scale-x-100
    ${activeLink === path ? 'before:scale-x-100' : ''}
  `;



  // useEffect(() => {
  //   setActiveLink(location.pathname);
  // }, [location]);


  // Check if the current route falls under the "My Profile" section
  const isProfileActive = ["/my-profile", "/post-for-volunteer", "/ManageMyPostRequest"].includes(activeLink);

  // Function to get the style for a link
  // const getLinkStyle = (path) => `
  //   relative px-2 py-2 text-sm font-bold font_header transition-colors duration-200
  //   ${activeLink === path ? "text-[#41b3a2]" : "text-black hover:text-[#41b3a2]"}
  //   before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
  //   before:bg-[#41b3a2] before:transform before:scale-x-0 before:transition-transform
  //   before:duration-300 hover:before:scale-x-100
  //   ${activeLink === path ? "before:scale-x-100" : ""}
  // `;



  // ___________________________logout handler


  const handleLogout = async () => {
    try {
      await logOut();
   
      // toast.success('Logout successful!');
      navigate('/');
     
    } catch (error) {
      console.error('Logout error:', error);
    }
  };





  // ___________________________getProfileImage helper function

  const getProfileImage = (user) => {
    if (user.photoURL) {
        return user?.photoURL || user.photoURL;
    }
    
    if (user.providerData) {
        for (const provider of user.providerData) {
            if (provider.photoURL) {
                return provider?.photoURL;
            }
        }
    }
    
    return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  };








  // ___________________________ProfileImage component

  const ProfileImage =  ({ user }) => {


    const [imageError, setImageError] = React.useState(false);
    // const [imageUrl, setImageUrl] = React.useState(null);

    const imageUrl = !imageError ? getProfileImage(user) : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    console.log(imageUrl);



    // const imageUrl =   getProfileImage(user) ;

    // useEffect(() => {
    //   setImageUrl(getProfileImage(user));
    // }, [user]);

    // setImageUrl(user?.photoURL);
    console.log(imageUrl);

    return (

      // <Tooltip className='cursor-pointer bg-[#151515] text-white' content={`Hi ${user.displayName || 'User'}! `}>
      // <div className='cursor-pointer bg-[#151515] text-white' content={`Hi ${user.displayName || 'User'}! `}>
      <>
        <img
            className="h-8 w-8 rounded-full object-cover border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
            src={imageUrl}
            alt={user.displayName || 'Profile'}
           
            onError={() => setImageError(true)}
            />
            </>
       
    );
  };






  return (
    <nav className={`font_header ${darkMode == true ? "bg-black/20 text-white" : "bg-white text-black"} backdrop-blur-md fixed  shadow-lg w-full top-0 z-50`}>
      <div className="w-full mx-auto px-2 sm:px-2 lg:px-2">
        <div className="flex justify-between items-center h-16">
       
          <div className="flex flex-shrink-0 items-center  gap-1 sm:gap-4">
            <Link to="/" className="flex items-end  space-x-1">
              <span className="font_header text-3xl sm:text-3xl md:text-xl lg:text-3xl text-md font-bold bg-gradient-to-r from-[#41b3a2] to-[#151515] bg-clip-text text-transparent truncate">
              Job 
              </span>
              <img
                className="block md:hidden lg:block h-12  w-12 sm:h-10 mb-2"
                src={JobLogo}
                alt="Logo"
              />
              <span className="font_header text-3xl sm:text-3xl md:text-xl lg:text-3xl text-md font-bold bg-gradient-to-r from-[#41b3a2] to-[#151515] bg-clip-text text-transparent truncate">
              Seeker
              </span>
            </Link>

            <div className='md:hidden '>
             <DarkModeToggle></DarkModeToggle>
          </div>

          </div>

        


          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          
            <Link to="/" className={getLinkStyle('/')} onClick={() => setActiveLink('/')}>
              <FaHome className="lg:inline-block mr-1" /> Home
            </Link>

            <Link to="/all-post-volunteer" className={getLinkStyle('/all-post-volunteer')} onClick={() => setActiveLink('/all-post-volunteer')}>
              <VscOpenPreview className="lg:inline-block mr-1"/> All Post Volunteer
            </Link>

            {/* <Link to="/post-for-volunteer" className={getLinkStyle('/post-for-volunteer')} onClick={() => setActiveLink('/post-for-volunteer')}>
              <VscOpenPreview className="lg:inline-block mr-1"/> Post for volunteer 
            </Link>


            <Link to="/ManageMyPostRequest" className={getLinkStyle('/ManageMyPostRequest')} onClick={() => setActiveLink('/ManageMyPostRequest')}>
              <VscOpenPreview className="lg:inline-block mr-1"/> My Volunteer Need Post
            </Link> */}

        

              {/* <div   className={`dropdown dropdown-bottom ${getLinkStyle('/my-profile')}`} onClick={() => setActiveLink('/my-profile')}>
              <div tabIndex={0} role="button" className="">My Profile</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
               
                <li className={`my-1`}
               
                ><Link to={"/post-for-volunteer"}>Add Volunteer need Post</Link></li>

                <li className={`my-1`}
          
                
                ><Link to={"/ManageMyPostRequest"}>Manage My Posts </Link></li>
              </ul>
            </div> */}


<div className={`dropdown dropdown-bottom ${isProfileActive ? "active-class" : ""}`}>
      <div
        tabIndex={0}
        role="button"
        className={`px-4 py-2 cursor-pointer ${
          isProfileActive ? `text-[#41b3a2] border-b-[3px] border-[#41b3a2]` : ` hover:text-[#41b3a2]  ${darkMode == true ? "text-white" : "text-black"}`
        }`}
        onClick={() => setActiveLink("/my-profile")}
      >
        My Profile
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ${darkMode == true ? "text-white bg-black" : "text-black bg-white"}`}
      >
        <li className="my-1 ">
          <Link
            to="/post-for-volunteer"
            className={getLinkStyle("/post-for-volunteer")}
          >
            Add Volunteer Need Post
          </Link>
        </li>
        <li className="my-1">
          <Link
            to="/ManageMyPostRequest"
            className={getLinkStyle("/ManageMyPostRequest")}
          >
            Manage My Posts
          </Link>
        </li>
      </ul>
    </div>


           

            
              
              <Link to="/saveJob" className={getLinkStyle('/saveJob')} onClick={() => setActiveLink('/saveJob')}>
                {/* <IoGameControllerOutline className="lg:inline-block mr-1" />Saved Job */}
                <FiSave className="lg:inline-block mr-1" />Saved Job
              </Link>



          
            <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Change Mode"
            data-tooltip-place="top"
            >
            <DarkModeToggle></DarkModeToggle>

          </a>
          <ReactTooltip id="my-tooltip">This is a tooltip</ReactTooltip>

          </div>








          {/* User Profile/Login Button - Updated for mobile */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {user ? (
              <div className="flex items-center gap-2 lg:gap-4">
              
                <Link to="/my-profile" className='flex flex-col lg:flex lg:flex-row items-center justify-center lg:gap-2'>



                
                 
                 {/* <span className="hidden md:block text-sm font-medium text-gray-700">
                   {user.email?.split('.')[0] || user.email?.split('@')[0] || 'User'}
                 </span> */}
                </Link>


              


      <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className=" btn-circle"> 
          <ProfileImage user={user} />
          </div>
        <ul tabIndex={0} className={`dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ${darkMode == true ? "text-white bg-black" : "text-black bg-white"}`}>
          <li> <a className="justify-between">{user.displayName || 'User'}</a></li>
          <li><Link to="/my-profile" className="justify-between">Profile<span className="badge">New</span></Link></li>
          <li><button  onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>


                  
             
  
              

              </div>
            ) : (
              <>
              <Link
                to="/login"
               className=" px-6 py-2 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl bg-[#41b3a2] "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#151515] border-2 px-6 py-2 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl"
              >
                Register
              </Link>
              </>
            )}
          </div>




          {/* Mobile menu button - Updated styling */}
          <div className="md:hidden flex items-center ml-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-1 rounded-md text-[#41b3a2] hover:text-[#41b3a2]  focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#41b3a2]"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>




   
      <div 
        className={`
          md:hidden fixed  top-16 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out z-100
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
      >
      
        <div className="absolute inset-0 bg-blue-50" />
        
      
        <div className="relative px-4 pt-2 pb-3 space-y-2">
          <Link 
            to="/" 
            className={`block ${getLinkStyle('/')}`}
            onClick={() => {
              setActiveLink('/');
              setIsMobileMenuOpen(false);
            }}
          >
           
           <FaHome className="inline-block mr-1" /> Home
           
          </Link>

          <Link 
            to="/allJob" 
            className={`block ${getLinkStyle('/allJob')}`}
            onClick={() => {
              setActiveLink('/allJob');
              setIsMobileMenuOpen(false);
            }}
          >
             <VscOpenPreview className="inline-block mr-1" /> All Reviews
          </Link>


           <Link 
            to="/my-profile" 
            className={`block ${getLinkStyle('/my-profile')}`}
            onClick={() => {
              setActiveLink('/my-profile');
              setIsMobileMenuOpen(false);
            }}
          >
             <MdAddBox className="inline-block mr-1"/> Add Review
          </Link>


           <Link 
            to="/applied-job" 
            className={`block ${getLinkStyle('/applied-job')}`}
            onClick={() => {
              setActiveLink('/applied-job');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaUser className="inline-block mr-1" /> My Applied Job
          </Link>

           <Link 
            to="/saveJob" 
            className={`block ${getLinkStyle('/saveJob')}`}
            onClick={() => {
              setActiveLink('/saveJob');
              setIsMobileMenuOpen(false);
            }}
          >
           <IoGameControllerOutline className="inline-block mr-1" /> Game WatchList
          </Link>


       { user && <>
         <Link 
            to="/my-profile" 
            className={`block ${getLinkStyle('/my-profile')}`}
            onClick={() => {
              setActiveLink('/my-profile');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaUser className="inline-block mr-1" /> Profile
          </Link>
        </> }
         

             { user && <div className="flex justify-center"><ProfileImage user={user} /></div>} 
             {/* { user && <div className=" text-gray-700 break-words">
                    {user.email?.split('.')[0] || user.email || 'User'}
                  </div>}  */}

          {
            user && (
              <button
              onClick={handleLogout}
              className="bg-[#151515]  px-6 py-2 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl  hover:bg-[#41b3a2] "
            >
              Logout
            </button>
            )
          }
          
          {/* Add login button for mobile */}
          {!user && (
            <Link 
            to="/login" 
            className={`block ${getLinkStyle('/login')}`}
            onClick={() => {
              setActiveLink('/login');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaSignInAlt className="inline-block mr-1" /> Login
          </Link>
          )}

          {!user && (
             <Link 
             to="/register" 
             className={`block ${getLinkStyle('/register')}`}
             onClick={() => {
               setActiveLink('/register');
               setIsMobileMenuOpen(false);
             }}
           >
             <FaUserPlus className="inline-block mr-1" /> Register
           </Link>
          )}
        </div>
      </div>

      {/* {user && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-2 text-center">
          <p className="text-purple-800 font-medium">
            Welcome, {user.displayName || 'User'}!
          </p>
        </div>
      )} */}
    </nav>
  )
}

export default Navbar





