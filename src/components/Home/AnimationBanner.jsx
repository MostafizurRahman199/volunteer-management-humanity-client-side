import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Aos from "aos";

import banner12 from "../../assets/banner3.jpeg";
import banner13 from "../../assets/banner4.jpeg";
import banner14 from "../../assets/banner5.jpeg";
import banner15 from "../../assets/banner6.jpeg";
import bannerImageTeam from '../../assets/bannerImageTeam.jpg';
import { useDarkMode } from "../../Context/DarkModeContext";

export default function AnimationBanner() {

  const { darkMode } = useDarkMode();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className={`h-[550px] md:h-[500px]  py-4 ${darkMode == true ? "bg-[#1a3636]" : "bg-[#e8f1f2]"}`}>
      <Carousel className="h-full">
      
      

{/* Slide 4 */}
<div className="relative h-full w-full flex flex-col md:flex md:flex-row justify-between md:px-4">
  <div className="flex-1 flex flex-col justify-center items-center w-11/12 mx-auto h-full gap-10">
           <motion.h1
                animate={{ y:[ 0, -20, 0 ]}}
                // initial={{ y: -50 }}
                transition={{
                    
                    duration: 5,
                    ease: "easeOut",
                    repeat:Infinity
                }}
                className="text-4xl md:text-6xl text-center  font-bold text-[#0D7C66]"
                >
                We are{" "}
                <motion.span
                    animate={{ color: ["#0D7C66", "#41B3A2", "#0D7C66"] }}
                    transition={{ duration: 3, repeat: Infinity }} // Increased duration to 3 seconds
                >
                    for Humanity
                    {/* <motion.img
                       src="https://outsidein.org.uk/wp-content/uploads/2023/07/HUMANITY-3.png"
                       className="ml-8"/> */}
             
                </motion.span>{" "}
             </motion.h1>

    <motion.p
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className={`text-center text-lg md:text-2xl text-[#065F46] ${darkMode == true ? "text-[#41b3a2]" : "text-[#065F46]"}`}
    >
      "Join us in building stronger communities through acts of service and compassion."
    </motion.p>
  </div>
   

  <div className="flex-1 relative ">
    {/* <motion.div
      animate={{ rotate: [0, 5, 0] }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="relative rounded-full overflow-hidden border-l-8 border-t-8 border-[#10B981] mx-auto w-52 h-52 md:w-64 md:h-64"
    >
      <img
        src={banner12}
        alt="Slide 4 Main Image"
        className="w-full h-full object-cover"
      />
    </motion.div> */}
    <div className="flex justify-center items-center  h-full w-full">
    <motion.div
      animate={{ rotate: [0, 5, 0] }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="relative  rounded-tl-[50%] rounded-br-[50%] overflow-hidden border-r-8 border-b-8 border-[#10B981] w-56 h-56 md:w-96 md:h-96 "
    >
      <img
        src="https://familypromisecarteret.org/wp-content/uploads/2015/03/url-14.jpeg"
        alt="Slide 4 Main Image"
        className="w-full h-full object-cover"
      />
    </motion.div>
    </div>
    




  </div>
</div>


        {/* Slide 1 */}
        <div className="relative h-full w-full flex flex-col md:flex  md:flex-row md:px-4">
          <div className="flex-1  flex flex-col justify-center items-center w-11/12 mx-auto h-full gap-10">
           
          <motion.h1
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="text-4xl md:text-6xl text-center font-bold text-[#0d7c66]"
    >
      Together,{" "}
      <motion.span
        animate={{
          color: ["#065F46", "#10B981", "#065F46"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="inline-block"
      >
        We Grow
      </motion.span>
    </motion.h1>
              
                


            <motion.p
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className={`text-center text-lg md:text-2xl text-[#065F46] ${darkMode == true ? "text-[#41b3a2]" : "text-[#065F46]"}`}
            >
              "Join hands with us to create a brighter future. Volunteer and inspire change."
            </motion.p>
          </div>
          <div className="flex-1 relative">
          
  
            <div className="flex justify-center items-start h-full w-full">
            <motion.img
                src="https://beyondphilosophy.b-cdn.net/wp-content/uploads/2016/07/Accueil-Where-and-How-Does-Humanity-Impact-Customer-Experience-Michael-Lowenstein-Featured-Image.jpg"
                // src="https://outsidein.org.uk/wp-content/uploads/2023/07/HUMANITY-3.png"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                alt="Slide 1"
                // className="m-2 w-4/6 sm:w-3/6  md:w-6/12 h-auto flex items-center justify-center object-cover object-center rounded-bl-none rounded-[40px] border-l-8 border-b-8 border-[#41B3A2]"
                // className="m-2 w-4/6 sm:w-3/6  md:w-6/12 h-auto flex items-center justify-center object-cover object-center rounded-2xl border-l-8 border-[#41B3A2]"
                className="m-2 w-4/6 sm:w-3/6  md:w-6/12 h-auto flex items-center justify-center object-cover object-center rounded-[40px] border-l-8 border-t-8 border-[#41B3A2]"
                />
            </div>
            <motion.img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?fit=fillmax&fm=jpg&ixid=MnwzNTY3MHwwfDF8YWxsfHx8fHx8fHx8MTYxNzE2MjY3Mw&ixlib=rb-1.2.1&q=75"
              animate={{x:[0, 20, 0]}}
              transition={{duration: 8, repeat:Infinity}}
              alt="Slide 1"
              className=" absolute top-36 left-16 md:top-52 md:left-44 lg:top-52 lg:left-60 m-2 w-4/6 sm:w-3/6 md:w-6/12 mx-auto  object-cover object-center   rounded-[40px] border-r-8 border-b-8
              border-[#41B3A2]"
              // className=" absolute top-36 left-16 md:top-52 md:left-44 lg:top-52 lg:left-60 m-2 w-4/6 sm:w-3/6 md:w-6/12 mx-auto  object-cover object-center rounded-tr-none rounded-[40px] border-t-8 
              // border-r-8
              // border-[#41B3A2]"
            />
         
          </div>
        </div>

    







{/* //slide 2 */}
<div className=" relative h-full w-full flex flex-col md:flex md:flex-row md:px-4">
    <div className="flex-1 relative flex flex-col justify-center items-center w-11/12 mx-auto h-full gap-10">
        <motion.h1
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 5,
            ease: "easeOut",
            repeat: Infinity,
          }}
          className="text-4xl md:text-6xl text-center font-bold text-[#0d7c66]"
        >
          Be the{" "}
          <motion.span
             animate={{ color: ["#0D7C66", "#41B3A2", "#0D7C66"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Change
          </motion.span>
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          className={`text-center text-lg md:text-2xl text-[#065F46] ${darkMode == true ? "text-[#41b3a2]" : "text-[#065F46]"}`}
        >
          "Your actions can make a difference. Volunteer today and bring hope to those in need."
        </motion.p>
      </div>

    <div className="flex-1 relative">
      <div className="flex justify-center ">
      <motion.img
          src="https://www.stjohnsunited.org/wp-content/uploads/Help-Others-Cover-Image.jpg"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          alt="Slide 2"
          className="m-2 w-5/6 sm:w-3/6 md:w-11/12 h-auto flex items-center justify-center object-cover object-center rounded-t-[40px] rounded-r-[40px]  border-b-8 border-l-8 border-[#41B3A2]"
        />
      </div>
        <motion.img
          src="https://agebrilliantly.org/wp-content/uploads/2024/02/Volunteer-scaled.jpg"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          alt="Slide 2"
          className="absolute top-36 left-16 md:top-52 md:left-44 lg:top-52 lg:left-60 m-2 w-4/6 sm:w-3/6 md:w-6/12 object-cover object-center  rounded-t-[40px] rounded-r-[40px]  border-b-8 border-l-8 border-[#41B3A2]"
        />
      </div>
</div>

 


      </Carousel>
    </div>
  );
}
