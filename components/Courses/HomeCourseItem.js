// import React from 'react';
// import Typewriter from 'typewriter-effect';

// import { ArrowRight, Clock, Users } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// const CourseItem = ({ item, upcoming, running }) => {
//   return (
//     <div
//       className="w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:border-[#676767]
//     transition-border duration-300 cursor-pointer relative bg-white border"
//     >
//       <div
//         className={`${
//           upcoming
//             ? 'bg-[#4caf50]'
//             : running
//             ? 'bg-[#9c27b0]'
//             : 'bg-[orangered]'
//         } w-[80px] md:w-[120px] h-[80px] md:h-[120px]  absolute -rotate-45 -left-10 md:-left-16 -top-10 md:-top-16 flex justify-center items-end`}
//       >
//         <div>
//           {item?.status == 'Registration Going on' ? (
//             <p className="mb-1 text-[8px] md:text-[11px] leading-[1] text-white font-semibold text-center">
//               Registration <br /> Going on
//             </p>
//           ) : (
//             <p className="mb-2 text-[10px] md:text-[13px] text-white font-semibold">
//               {item?.status}
//             </p>
//           )}
//         </div>
//       </div>
//       <Link href={`/course-details/${item.item_id}`}>
//         <Image
//           width={1000}
//           height={300}
//           src={item.img}
//           alt=""
//           className="w-full h-[240px] md:h-[200px]"
//         />
//         <div className="rounded-lg rounded-t-none flex flex-col h-[calc(100%-240px)] md:h-[calc(100%-200px)]">
//           <div className="p-0.5 md:p-2 border-b-1 border-[#d6dae1] flex items-center flex-wrap">
//             <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded">
//               {upcoming ? (
//                 <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
//                   Upcoming
//                 </span>
//               ) : (
//                 <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
//                   Batch <strong>{item?.batch_no}</strong>
//                 </span>
//               )}
//             </div>
//             <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
//               <Users className="text-xl" />

//               <span className="text-[10px] md:text-[12px] block -mt-[1px]">
//                 Total Seat <strong>{item?.total_seat_number}</strong>
//               </span>
//             </div>
//             {upcoming || running ? (
//               ''
//             ) : (
//               <div>
//                 {new Date(item?.main_class_starting_date).getTime() >=
//                   new Date().getTime() && (
//                   <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
//                     <Clock />
//                     <span className="text-[10px] md:text-[12px] -mt-[1px]">
//                       <strong>
//                         {' '}
//                         {new Date(item?.main_class_starting_date).getTime() >=
//                         new Date().getTime()
//                           ? Math.ceil(
//                               (new Date(
//                                 item?.main_class_starting_date,
//                               ).getTime() -
//                                 new Date().getTime()) /
//                                 (1000 * 60 * 60 * 24),
//                             )
//                           : 0}{' '}
//                       </strong>
//                       Days Left
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//           <p
//             className="flex-1 text-base leading-5 md:text-lg font-bold mb-1.5 mt-2 text-[#140342]
//           px-1 md:px-4"
//           >
//             {item.item_name}
//           </p>
//           {item?.status == 'Registration Going on' && (
//             <div className="text-xl">
//               <p
//                 className=" flex-1 text-[13px] md:text-lg font-bold mb-1.5 md:mt-1
//           px-1 md:px-4 text-[#39b94a] text-center"
//               >
//                 <Typewriter
//                   options={{
//                     strings: ['Registration Going on', 'Registration Going on'],
//                     autoStart: true,
//                     loop: true,
//                     deleteSpeed: 15,
//                   }}
//                 />
//               </p>
//             </div>
//           )}
//           <div
//             className="flex justify-end font-medium text-[14px] flex-wrap text-[#4F547B]
//             bg-[#f9f9fa] py-4 px-2"
//           >
//             <button
//               className="w-full bg-[#eaecf0] text-[#0a0a0a] py-[6px] md:py-[10px] px-[16px] md:px-[24px] rounded-[8px]
//               text-[12px] md:text-sm hover:opacity-[0.9] transition-all uppercase tracking-wider inline-flex items-center
//             justify-center gap-2"
//             >
//               See Details <ArrowRight className="text-xl" />
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default CourseItem;

import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Clock, Layers, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

const CourseItem = ({ item, upcoming, running }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = upcoming
    ? 'from-emerald-500 to-emerald-600'
    : running
    ? 'from-purple-500 to-purple-600'
    : 'from-orange-500 to-orange-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full mx-auto rounded-xl overflow-hidden sm:mx-2 bg-white 
                 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Premium Badge */}
      <div className="absolute top-3 right-3 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1.5
                     rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-lg"
        >
          <Star className="w-3.5 h-3.5" />
          Premium
        </motion.div>
      </div>

      {/* Status Banner */}
      <div className="absolute -left-8 -top-28 z-10 ">
        <div
          className={`w-28 h-28 bg-gradient-to-r ${statusColor} -rotate-45 transform origin-bottom-right
                        flex justify-center items-end`}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-2.5 text-white font-medium text-center rotate-180"
          >
            {item?.status === 'Registration Going on' ? (
              <p className="text-[9px] leading-tight tracking-wide">
                Registration
                <br />
                Going on
              </p>
            ) : (
              <p className="text-[11px] tracking-wide">{item?.status}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative overflow-hidden h-[240px]">
        <motion.img
          src={item.img}
          alt={item.item_name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Floating Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex gap-2">
            <div
              className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg 
                          flex items-center gap-1.5 text-gray-800"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium">
                {item?.batch_no || '2501'} Batch
              </span>
            </div>
            <div
              className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg 
                          flex items-center gap-1.5 text-gray-800"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium">Certificate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px] leading-7">
          {item.item_name}
        </h3>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="px-1.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs 
                     font-medium flex items-center gap-1"
          >
            <Layers className="w-4 h-4" />
            {item?.project_number} Real Project
          </motion.span>

          {!upcoming &&
            !running &&
            new Date(item?.main_class_starting_date).getTime() >=
              new Date().getTime() && (
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="px-1.5 py-1 bg-orange-50 text-orange-700 rounded-lg 
                       text-xs font-medium flex items-center gap-1"
              >
                <Clock className="w-4 h-4" />
                {Math.ceil(
                  (new Date(item?.main_class_starting_date).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{' '}
                Days Left
              </motion.span>
            )}
        </div>

        {/* Registration Status */}
        {item?.status === 'Registration Going on' && (
          <div className="mb-4">
            <div className="text-base font-semibold text-emerald-600">
              <Typewriter
                options={{
                  strings: [
                    'Registration Open',
                    'Limited Seats Available',
                    'Register Now!',
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 15,
                }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/course-details/${item?.key}`}>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
          hover:to-blue-800 text-white py-3 px-5 rounded-lg text-sm 
          font-medium uppercase tracking-wide flex items-center justify-center gap-2 
          shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>Explore Course</span>
            <motion.div
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseItem;
