// import React from "react";
// import { motion } from "framer-motion";
// import ApiComponent from "../../API/ApiComponent";
// import { useQuery } from "@tanstack/react-query";

// export function Gallery() {
//   const data = [
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
//     },
//     {
//       imageLink:
//         "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
//     },
//     {
//       imageLink:
//         "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
//     },
//     {
//       imageLink:
//         "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
//     },
//   ];



//   const { getWorkExperience } = ApiComponent(); // API call function

//   // Fetch Work Experience Data
//   const { data: workExperiences, isLoading, isError } = useQuery({
//     queryKey: ["workExperiences"],
//     queryFn: () => getWorkExperience(),
//   });

//   if (isLoading) return <Loading></Loading>;
//   if (isError) return <ErrorPage></ErrorPage>;


//   return (
//     <motion.div
//       className="w-10/12 mx-auto my-8"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <h1 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
//         Our Old Memories
//       </h1>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//         {workExperiences.map(({ workingImageURL }, index) => (
//           <motion.div
//             key={index}
//             className="relative overflow-hidden group"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <img
//               className="h-40 w-full max-w-full rounded-lg object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
//               src={workingImageURL}
//               alt="gallery-photo"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }




import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";

export const Gallery = () => {
  const { getWorkExperience } = ApiComponent(); // API call function

  // Fetch Work Experience Data
  const { data: workExperiences, isLoading, isError } = useQuery({
    queryKey: ["workExperiences"],
    queryFn: () => getWorkExperience(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  // Sort work experiences by `createdAt` in ascending order
  const sortedWorkExperiences = workExperiences?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <motion.div
      className="w-10/12 mx-auto my-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-[#41B3A2] text-center my-8">
        Our Recent Memories
      </h1>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 overflow-y-scroll"
        style={{ maxHeight: "600px" }} // Fixed height for the gallery container
      >
        {sortedWorkExperiences?.map(({ workingImageURL, title, createdAt }, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden group bg-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              className="h-40 w-full max-w-full rounded-t-lg object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
              src={workingImageURL}
              alt={title}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#0D7C66] mb-1">{title}</h3>
              <p className="text-sm text-gray-500">
                <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};



