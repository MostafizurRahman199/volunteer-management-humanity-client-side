
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
        console.log(response);
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
  const handleError = (error) => {
    console.error("API Error:", error.message);
    throw error; // Rethrow the error for the caller to handle
  };



  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  // Fetch my posted job
  const myJobPost = async (email) => {
    try {
      const response = await api.get(`/jobs/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };




  // Fetch job application by ID
  const getJobApplication = async (jobId) => {
    try {
      const response = await api.get(`/viewJobApplication/${jobId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Update job application status
  const updateJobApplicationStatus = async (id, statusData) => {
    try {
      const response = await api.patch(`/jobApplication-view/${id}`, { statusData });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Delete my job post
  const deleteMyJobPost = async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch all jobs
  const allJob = async () => {
    try {
      const response = await api.get("/allJob");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch job details by ID
  const fetchJobDetails = async (id) => {
    try {
      const response = await api.get(`/jobDetails/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Update job post
  const updateJobPost = async (updatedData, id) => {
    try {
      const response = await api.put(`/jobs/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating job post with ID: ${id}`, error);
      throw error;
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



  // Post job application
  const postJobApplication = async (data) => {
    try {
      const response = await api.post(`/job-applications`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  // Post job application


  // Get applied jobs
  const getAppliedJob = async (email) => {
    try {
      const response = await api.get(`/applied-job/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Delete applied job
  const deleteAppliedJob = async (id, jobId) => {
    try {
      const response = await api.delete(`/applied-job/${id}?jobId=${jobId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };








  // Post a job
  const postAddJob = async (data) => {
    try {
      const response = await api.post(`/addJob`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Save a job
  const saveJob = async (data) => {
    try {
      const response = await api.post(`/saveJob`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Get saved jobs
  const getMySavedJobs = async (email) => {
    try {
      const response = await api.get(`/saveJob/${email}`);
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





  // Return the methods and logic for usage in components
  return {
    fetchJobs,
    myJobPost,
    getJobApplication,
    updateJobApplicationStatus,
    deleteMyJobPost,
    allJob,
    fetchJobDetails,
    updateJobPost,
    jwtTokenValidation,
    logoutRoute,
    postJobApplication,
    getAppliedJob,
    deleteAppliedJob,
    postAddJob,
    saveJob,
    getMySavedJobs,

    postVolunteerNeed,
    getVolunteerPosts,
  };
};

export default ApiComponent;

