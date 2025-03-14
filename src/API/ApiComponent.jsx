
import React, { useEffect } from "react";
import axios from "axios";


import useAxiosSecure from "../hooks/useAxiosSecure";
import { useFirebaseAuth } from "../hooks/useAuth";
import { config } from "localforage";


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


const getVolunteerPosts = async () => {
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




  // __________my volunteer request  page


  const getVolunteerRequestsByEmail = async (email) => {
    try {
      const response = await api.get(`/volunteer-requests/${email}`);
      return handleResponse(response); // Simplified handling
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch requests");
    }
  };
  
  const cancelVolunteerRequest = async (data) => {
 
    console.log(data);
    try {
      const response = await api.post(`/cancel-volunteer-request`,  data );
      return response; // Simplified handling
    } catch (error) {
      console.error("Error canceling volunteer request:", error.message);
      throw new Error(error.response?.data?.message || "Failed to cancel request");
    }
  };
  


  // home -> volunteer need now
  const getSortedVolunteerPosts = async () => {
    try {
      const response = await api.get("/volunteer-posts-sorted");
      return response.data; 
    } catch (error) {
      console.error("Error fetching sorted posts:", error.message);
      throw error;
    }
  };



  // ________Work Experience
  const postWorkExperience = async (data) => {
    try {
        const response = await api.post('/work-experience', data);
        return response.data; // Return response data
    } catch (error) {
        console.error("Error posting work experience:", error.message);
        throw new Error(error.response?.data?.message || "Failed to post work experience.");
    }
};

const getWorkExperience = async () => {
    try {
        const response = await api.get('/work-experience');
        return response.data; // Return work experience data
    } catch (error) {
        console.error("Error fetching work experience:", error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch work experience.");
    }
};



// received request page
const getOrganizerPosts = async (email) => {
  try {
    const response = await api.get(`/organizer-posts/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizer posts:", error.message);
    throw error;
  }
};


const getAppliedRequests = async (postIds) => {
  try {
    const response = await api.post(`/applied-requests`, { postIds });
    return response.data;
  } catch (error) {
    console.error("Error fetching applied requests:", error.message);
    throw error;
  }
};

// const updateRequestStatus = async (id, status) => {
//   console.log("THIS IS ID:", id);
//   console.log("THIS IS STATUS:", status);
//   const data = {data, is}
//   try {
//     const response = await api.post(`/update-request-status` , data);
//     console.log("Response:", response.data); // Debug the response structure
//     return response;
//   } catch (error) {
//     console.error("Error updating request status:", error.message);
  
//   }
// };


const updateRequestStatus = async (id,postId, status) => {
  try {
    const data = {id,postId, status}
    const response = await api.post('/update-request-status', data);
      return response.data; // Return response data
  } catch (error) {
      console.error("Error posting work experience:", error.message);
      throw new Error(error.response?.data?.message || "Failed to post work experience.");
  }
};



// detail post page
const saveVolunteerPost = async (saveData) => {
  try {
    const response = await api.post(`/save-post`, saveData);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error saving the volunteer post:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to save the volunteer post."
    );
  }
};


// message 
// support.jsx
const MessagePost = async (message) => {
  try {
    console.log(message);
    const response = await api.post("/contact-message", message);
    // console.log(response);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error saving the volunteer post:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to save the volunteer post."
    );
  }
};

const checkSavedStatus = async (postId, email) => {
  try {
    const response = await api.get(`/check-saved/${postId}/${email}`);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error fetching saved status:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch saved status."
    );
  }
};


// saved post page
const getSavedPosts = async (email) => {
  const response = await api.get(`/saved-posts/${email}`);
  return response.data;
};

const deleteSavedPost = async (postId, email) => {
  const response = await api.delete(`/saved-posts/${postId}/${email}`);
  return response.data;
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
    

    getVolunteerRequestsByEmail,
    cancelVolunteerRequest,

    getSortedVolunteerPosts,

    postWorkExperience, 
    getWorkExperience, 

    getOrganizerPosts,
    getAppliedRequests,
    updateRequestStatus,


    saveVolunteerPost,
    checkSavedStatus,

    deleteSavedPost,
    getSavedPosts,

    MessagePost,
  
  };
};

export default ApiComponent;

