// import React, { useEffect, useState } from "react";
// import PlayArrow from "@mui/icons-material/PlayArrow";
// import Add from "@mui/icons-material/Add";
// import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
// import ThumbDownOutlined from "@mui/icons-material/ThumbDownOutlined";

// export default function ListItem({ index }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     setMovie({
//       imgSm: "https://via.placeholder.com/230x130.png?text=Movie",
//       trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
//       duration: "1h 45min",
//       limit: 12,
//       year: 2022,
//       desc: "A demo movie description for preview purposes.",
//       genre: "Drama",
//     });
//   }, []);

//   return (
//     <div
//       className={`relative cursor-pointer bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 ${
//         isHovered ? "z-50 scale-110 shadow-lg" : ""
//       }`}
//       style={{ left: isHovered ? index * 225 - 50 + index * 2.5 : 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={movie.imgSm}
//         alt="movie"
//         className="w-[230px] h-[130px] object-cover"
//       />

//       {isHovered && (
//         <>
//           <video
//             src={movie.trailer}
//             autoPlay
//             loop
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           />

//           <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
//             {/* Icons */}
//             <div className="flex gap-3 mb-2">
//               <PlayArrow className="bg-white rounded-full p-1 text-black cursor-pointer" />
//               <Add className="bg-white rounded-full p-1 text-black cursor-pointer" />
//               <ThumbUpAltOutlined className="bg-white rounded-full p-1 text-black cursor-pointer" />
//               <ThumbDownOutlined className="bg-white rounded-full p-1 text-black cursor-pointer" />
//             </div>

//             {/* Top info */}
//             <div className="flex items-center gap-3 text-white text-sm mb-1">
//               <span>{movie.duration}</span>
//               <span className="border border-white text-xs px-1 rounded">
//                 +{movie.limit}
//               </span>
//               <span>{movie.year}</span>
//             </div>

//             {/* Description */}
//             <div className="text-gray-300 text-xs line-clamp-2">
//               {movie.desc}
//             </div>

//             {/* Genre */}
//             <div className="text-gray-400 text-xs mt-1">{movie.genre}</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }