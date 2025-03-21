
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Loading from "../Loading/Loading";
import ErrorPage from "../Error.jsx/ErrorPage";
import { useDarkMode } from "../../Context/DarkModeContext";

export const Gallery = () => {
  const { darkMode } = useDarkMode();
  const { getWorkExperience } = ApiComponent(); // API call function

  // Fetch Work Experience Data
  const { data: workExperiences, isLoading, isError } = useQuery({
    queryKey: ["workExperiences"],
    queryFn: () => getWorkExperience(),
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;

  // Sort work experiences by `createdAt` in ascending order
  const sortedWorkExperiences = workExperiences?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt) 
  );

  return (
    <motion.div
      className="w-10/12 mx-auto my-8 px-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
        Our Recent Memories
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-scroll max-h-[600px] overflow-x-hidden md:p-8"
      >
        {sortedWorkExperiences?.map(({ workingImageURL, title, createdAt }, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden group  shadow-xl ${darkMode ? "text-[#41b3a2] bg-[#151414]" : "bg-white text-[#0D7C66]"}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              className="h-40 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              src={workingImageURL}
              alt={title}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#0D7C66] mb-1">{title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
