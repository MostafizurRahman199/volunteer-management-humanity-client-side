
import React, { useEffect } from "react";
import axios from "axios";


import useAxiosSecure from "../hooks/useAxiosSecure";
import { useFirebaseAuth } from "../hooks/useAuth";


const ApiComponent = () => {


  const api = useAxiosSecure();
  const {logOut} = useFirebaseAuth() ;

  

  useEffect(()=>{

    api.interceptors.response.use(
     
      (response) => {
        // console.log(response);
        return response;
      },


      (error) => {
        if ( error.response.status === 401 || error.response.status === 403) 
        {
          console.log("Session expired or unauthorized access!");
          handleLogout();
          // logOut();
        }
        return Promise.reject(error);
      }
        
    );

  },[])








  const handleLogout = async () => {
    try {
      console.log("inside handle logout")
      await logOut();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };



  // Helper function to handle responses
  const handleResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error(`HTTP Error: ${response.status}`);
  };




  // Helper function to handle errors
  // const handleError = (error) => {
  //   console.error("API Error:", error.message);
  //   throw error; // Rethrow the error for the caller to handle
  // };

  const handleError = (error) => {
    if (error.response) {
      // Server responded with a status code out of 2xx range
      console.error("API Error:", error.response.data?.message || error.response.statusText);
      throw new Error(error.response.data?.message || `HTTP Error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("API Error (No Response):", error.message);
      throw new Error("No response received from server. Please check your network.");
    } else {
      // Something happened in setting up the request
      console.error("API Error (Request Setup):", error.message);
      throw new Error(error.message || "Unexpected error occurred.");
    }
  };
  
  


  // JWT Token Validation
  const jwtTokenValidation = async (data) => {
    try {
      const response = await api.post(`/jwt`, { email: data });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Logout route
  const logoutRoute = async () => {
    try {
      const response = await api.post(`/logout`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };




// start here for project
const postVolunteerNeed = async (data) => {
  try {
    const response = await api.post(`/post-for-volunteer`, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


const getVolunteerPosts = async (email) => {
  try {
    const response = await api.get(`/all-post-volunteer`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};



const getVolunteerPostById = async (id) => {
  try {
    const response = await api.get(`/volunteer-post/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const postApplyVolunteer = async (data) => {
  
  try {
    const response = await api.post(`/apply-for-volunteer`, {data});
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// const decreaseVolunteerNeed = async (id) => {
//   try {
//     console.log(id);
//     const response = await api.patch(`/decrease-volunteer-need/${id}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };


const decreaseVolunteerNeed = async (id) => {
  try {
    console.log("Decrementing volunteers needed for post ID:", id);
    const response = await api.patch(`/decrease-volunteer-need/${id}`);
    console.log("API Response:", response.data);
    return handleResponse(response);
  } catch (error) {
    console.error("Error in decreaseVolunteerNeed:", error.message);
    handleError(error);
  }
};






  // Fetch all posts by a specific user
  const getVolunteerPostsByEmail = async (email) => {
    try {
      const response = await api.get(`/volunteer-posts/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  // Fetch a specific post by ID
  const getMyVolunteerPostById = async (id) => {
    try {
      const response = await api.get(`/volunteer-post/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Update a post
  const updateVolunteerPost = async (data) => {
    console.log(data._id);
    try {
      const response = await api.put(`/update-volunteer-post/${data._id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      const response = await api.delete(`/delete-volunteer-post/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };






  // Return the methods and logic for usage in components
  return {
   
    jwtTokenValidation,
    logoutRoute,
    

    postVolunteerNeed,
    getVolunteerPosts,
    getVolunteerPostById,
    postApplyVolunteer,
    decreaseVolunteerNeed,



    getVolunteerPostsByEmail,
    getMyVolunteerPostById,
    updateVolunteerPost,
    deletePost,
    
  
  };
};

export default ApiComponent;

