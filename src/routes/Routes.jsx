import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Register from "../pages/Register";
import Login from "../pages/Login";

import ForgetPassword from "../pages/ForgetPassword";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Profile from "../pages/Profile";

import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";


import PostForVolunteer from "../pages/PostForVolunteer/PostForVolunteer";
import AllPostForVolunteer from "../pages/AllPostForVolunteer/AllPostForVolunteer";




const router = createBrowserRouter([    
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Home</title>
                        </Helmet>
                        <Home />
                    </>
                ),
            },
     
           {
                path: "/register",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
           
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - All Reviews</title>
                        </Helmet>
                      
                    </>
                ),
               
            },
            {
                path: "",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Review Details</title>
                        </Helmet>
                        
                    </>
                ),
               
            },
            {
                path: "/post-for-volunteer",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Add Job</title>
                        </Helmet>
                        <PrivateRoute>
                          <PostForVolunteer></PostForVolunteer>
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/all-post-volunteer",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - All Post Volunteer</title>
                        </Helmet>
                        <PrivateRoute>
                          <AllPostForVolunteer></AllPostForVolunteer>
                        </PrivateRoute>
                    </>
                ),
            },
           
            {
                path: "/something/:id",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Apply Job</title>
                        </Helmet>
                        <PrivateRoute>
                          {/* component call */}
                        </PrivateRoute>
                    </>
                ),
            },
            
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - My Review</title>
                        </Helmet>
                        <PrivateRoute>
                           {/* write a component  */}
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Game WatchList</title>
                        </Helmet>
                        <PrivateRoute>
                            {/* write a component  */}
                        </PrivateRoute>
                    </>
                ),
            },
           
         
            {
                path: "/login",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Login</title>
                        </Helmet>
                        <Login />
                    </>
                ),
            },
            {
                path: "/something",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - All Job</title>
                        </Helmet>
                       
                    </>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Forgot Password</title>
                        </Helmet>
                        <ForgetPassword />
                    </>
                ),
            },
            {
                path: "/my-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - My Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </>
                ),
            },
            
           
           
            {
                path: "/update-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Update Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    </>
                ),
            },
           
           
        ],
    },
    {
        path: "*",
        element: (
            <>
                <Helmet>
                    <title>Job Seeker - Error</title>
                </Helmet>
                <ErrorPage />
            </>
        ),
    },
    
  
]);

export default router;