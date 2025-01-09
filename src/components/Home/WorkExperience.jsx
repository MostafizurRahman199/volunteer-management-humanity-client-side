import { div } from "motion/react-client";
import React from "react";
import ReactCardCarousel from "react-card-carousel";
import ApiComponent from "../../API/ApiComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import ErrorPage from "../Error.jsx/ErrorPage";
import { useDarkMode } from "../../Context/DarkModeContext";

const WorkExperience = () => {


    const { getWorkExperience } = ApiComponent(); // API call function
    const { darkMode } = useDarkMode();

    // Fetch Work Experience Data
    const { data: workExperiences, isLoading, isError } = useQuery({
      queryKey: ["workExperiences"],
      queryFn: () => getWorkExperience(),
    });
  
    if (isLoading) return <Loading></Loading>;
    if (isError) return <ErrorPage></ErrorPage>;
  

  const CARD_STYLE = {
    height: "300px",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    textAlign: "center",
    background: "#FFFFFF",
    color: "#247ba0",
    fontSize: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  };



  return (
    <div className="w-full md:w-11/12 mx-auto  px-2 py-32 md:pt-10 ">
      {/* Header */}

      {/* Carousel */}
      <ReactCardCarousel
        autoplay={true}
        autoplay_speed={3000}
        className="rounded-3xl bg-transparent"
      >
        {workExperiences.map((item, index) => (
          <div className="p-1 md:p-2 rounded-lg bg-[#41B3A2]">
            <div
              key={index}
              className={`flex flex-col  justify-around h-[400px] md:h-[300px] w-full  mx-auto md:max-w-[600px] p-5 text-center  ${darkMode ? "text-[#41b3a2] bg-[#151414]" : "bg-white text-[#0D7C66]"}  text-base rounded-3xl shadow-2xl `}
            >
              {/* Title and Description */}
              <h3 className="text-lg md:text-xl font-semibold text-start">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-start mt-2">
                {item.description.length >=80 ? item.description.slice(0, 80)+".." : item.description}
              </p>

              <div className="mt-4 flex flex-col md:flex md:flex-row items-center justify-start w-full gap-4">
                <img
                  src={item.yourImageURL}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md"
                />
                <div className="mt-2 text-center">
                  <p className="font-bold text-base md:text-lg">{item.name}</p>
                  <p className="text-sm ">{item.profession}</p>
                </div>
              </div>
              {/* Image and User Info */}
            </div>
          </div>
        ))}
      </ReactCardCarousel>
    </div>
  );
};

export default WorkExperience;
