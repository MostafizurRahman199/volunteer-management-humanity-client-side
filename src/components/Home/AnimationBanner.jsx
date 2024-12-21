import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Aos from "aos";

import banner12 from "../../assets/banner3.jpeg";
import banner13 from "../../assets/banner4.jpeg";
import banner14 from "../../assets/banner5.jpeg";
import banner15 from "../../assets/banner6.jpeg";
import bannerImageTeam from '../../assets/bannerImageTeam.jpg';

export default function AnimationBanner() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="h-[550px] md:h-[500px] bg-[#e8f1f2] py-4">
      <Carousel className="h-full">
        {/* Slide 1 */}
        <div className="relative h-full w-full flex flex-col md:flex  md:flex-row md:px-4">
          <div className="flex-1  flex flex-col justify-center items-center w-11/12 mx-auto h-full gap-10">
            <motion.h1
                animate={{ y:[ 0, -20, 0 ]}}
                // initial={{ y: -50 }}
                transition={{
                    
                    duration: 5,
                    ease: "easeOut",
                    repeat:Infinity
                }}
                className="text-4xl md:text-6xl text-center  font-bold text-[#006494]"
                >
                Latest{" "}
                <motion.span
                    animate={{ color: ["#006494", "#1b98e0", "#006494"] }}
                    transition={{ duration: 3, repeat: Infinity }} // Increased duration to 3 seconds
                >
                    Job
                for You.!
                </motion.span>{" "}
             </motion.h1>


            <motion.p
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className="text-center text-lg md:text-2xl text-[#006494]"
            >
              "Explore exciting career opportunities tailored just for you. Discover your next step towards success today!"
            </motion.p>
          </div>
          <div className="flex-1 relative">
          
  
            <div className="flex justify-center items-start h-full w-full">
            <motion.img
                src={bannerImageTeam}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                alt="Slide 1"
                className="m-2 w-4/6 sm:w-3/6  md:w-6/12 h-auto flex items-center justify-center object-cover object-center rounded-bl-none rounded-[40px] border-l-8 border-b-8 border-[#1b98e0]"
            />
            </div>
            <motion.img
              src="https://img.freepik.com/premium-photo/computer-office-collaboration-night-team-programming-erp-software-cybersecurity-system-programmer-code-app-data-science-ai-developer-diversity-teamwork-coding-cloud-computing-database_590464-157309.jpg"
              animate={{x:[0, 20, 0]}}
              transition={{duration: 8, repeat:Infinity}}
              alt="Slide 1"
              className=" absolute top-36 left-16 md:top-52 md:left-44 lg:top-52 lg:left-60 m-2 w-4/6 sm:w-3/6 md:w-6/12 mx-auto  object-cover object-center rounded-tr-none rounded-[40px] border-t-8 
              border-r-8
              border-[#1b98e0]"
            />
         
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-full w-full flex">
          <div className="flex-1 bg-[#ecedf2] flex flex-col justify-center items-center w-11/12 mx-auto h-full">
            <motion.h1
              animate={{ y: 0 }}
              initial={{ y: -50 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="text-4xl md:text-6xl font-bold text-[#1967d2]"
            >
              This is Demo Text
            </motion.h1>
          </div>
          <div className="flex-1">
            <img
              src={banner14}
              alt="Slide 2"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-full w-full flex">
          <div className="flex-1 bg-[#ecedf2] flex flex-col justify-center items-center w-11/12 mx-auto h-full">
            <motion.h1
              animate={{ y: 0 }}
              initial={{ y: -50 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="text-4xl md:text-6xl font-bold text-[#1967d2]"
            >
              Another Demo Text
            </motion.h1>
          </div>
          <div className="flex-1">
            <img
              src={banner13}
              alt="Slide 3"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
