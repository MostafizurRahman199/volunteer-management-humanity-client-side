import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Loading from "../Loading/Loading";
import ErrorPage from "../Error.jsx/ErrorPage";
import { div } from "motion/react-client";
import Aos from 'aos';

const VolunteerNeedNow = () => {
  const { getSortedVolunteerPosts } = ApiComponent();

  // Fetch the top 6 posts with upcoming deadlines
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["upcomingVolunteerPosts"],
    queryFn: () => getSortedVolunteerPosts(),
  });


  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);


  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <div className="w-full p-6  min-h-screen">
      <div className="w-10/12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
          Volunteer Need Now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.slice(0, 6).map((post) => (
           <div data-aos="zoom-in-up">
             <div
              key={post._id}
              className="shadow-lg rounded-2xl overflow-hidden border transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={post?.thumbnail || "https://img.freepik.com/free-vector/people-volunteering-donating-money_53876-66112.jpg"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
                  {post?.title.slice(0,25)}
                </h3>
                <p className="text-sm ">
                  <strong>Category:</strong> {post.category}
                </p>
                <p className="text-sm ">
                  <strong>Location:</strong> {post?.location.slice(0,25)}
                </p>
                <p className="text-sm  mb-4">
                  <strong>Deadline:</strong>{" "}
                  {new Date(post?.deadline).toLocaleDateString()}
                </p>
                <Link
                  to={`/volunteer-post-details/${post?._id}`}
                  className="inline-block text-center w-full py-2 px-4 bg-[#41B3A2] text-white rounded-2xl hover:bg-[#0D7C66] transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
           </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/all-post-volunteer"
            className="py-3 px-8 bg-[#41B3A2] text-white font-semibold rounded-2xl shadow-md hover:bg-[#0D7C66] transition-colors duration-300"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerNeedNow;
