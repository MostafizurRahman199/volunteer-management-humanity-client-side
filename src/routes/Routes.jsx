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
import VolunteerPostdetails from "../pages/VolunteerPostDetails/VolunteerPostdetails";
import MyVolunteerNeedPost from "../pages/MyVolunteerNeedPost/MyVolunteerNeedPost";
import ManageMyPostRequest from "../pages/ManageMyPostRequest/ManageMyPostRequest";
import ReceivedRequest from "../pages/ReceivedRequest/ReceivedRequest";
import MySavedPost from "../pages/MySavedPost/MySavedPost";
import Support from "../pages/Support/Support";




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
                            <title>Humanity - Home</title>
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
                            <title>Humanity - Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
           
           {
                path: "/support",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Support</title>
                        </Helmet>
                        <Support />
                    </>
                ),
            },
           
           
          
            {
                path: "/post-for-volunteer",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Add Post</title>
                        </Helmet>
                        <PrivateRoute>
                          <PostForVolunteer></PostForVolunteer>
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/my-saved-post",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Saved Post</title>
                        </Helmet>
                        <PrivateRoute>
                          <MySavedPost></MySavedPost>
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
                     
                          <AllPostForVolunteer></AllPostForVolunteer>
                       
                    </>
                ),
            },
            {
                path: "/volunteer-post-details/:id",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Volunteer Post Details</title>
                        </Helmet>
                        <PrivateRoute>
                          <VolunteerPostdetails></VolunteerPostdetails>
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/ManageMyPostRequest",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - My Volunteer Need Post</title>
                        </Helmet>
                        <PrivateRoute>
                          <ManageMyPostRequest></ManageMyPostRequest>
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/received-request",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Received Request</title>
                        </Helmet>
                        <PrivateRoute>
                          <ReceivedRequest></ReceivedRequest>
                        </PrivateRoute>
                    </>
                ),
            },
           
           
           
           
         
            {
                path: "/login",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Login</title>
                        </Helmet>
                        <Login />
                    </>
                ),
            },
           
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Humanity - Forgot Password</title>
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
                            <title>Humanity - My Profile</title>
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
                            <title>Humanity - Update Profile</title>
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
                    <title>Humanity - Error</title>
                </Helmet>
                <ErrorPage />
            </>
        ),
    },
    
  
]);

export default router;