import React from "react";

import AnimationBanner from "./AnimationBanner";
import VolunteerNeedNow from "./VolunteerNeedNow";
import { Gallery } from "./Gallery";
import WorkExperience from "./WorkExperience";
import ShakeYourWorkExperience from "./ShareYourExperience";



const Home = () => {
  return (
    <div>
   
 
      
      <AnimationBanner></AnimationBanner>
 
     <div className="relative min-h-[700px] ">
    <VolunteerNeedNow></VolunteerNeedNow>
    <Gallery></Gallery>
    <div className="relative md:py-10">
      <div className="text-center h-[400px]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#41B3A2]">What Our Volunteers Say</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">Hear from some of the amazing people we've helped.</p>
      </div>
      <WorkExperience></WorkExperience>
   </div>
    
      <ShakeYourWorkExperience></ShakeYourWorkExperience>
     
    </div>
    </div>
  );
};

export default Home;
