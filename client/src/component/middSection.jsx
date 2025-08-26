// import React from "react";
// import { Link } from "react-router-dom";

// // Assets (Thumbnails)
// import one from "../assets/one.webp";
// import two from "../assets/two.webp";
// import three from "../assets/three.webp";
// import four from "../assets/four.webp";
// import five from "../assets/five.webp";
// import six from "../assets/six.webp";
// import seven from "../assets/seven.webp";
// import eight from "../assets/eight.webp";
// import nine from "../assets/nine.webp";
// import ten from "../assets/ten.webp";

// import list1 from "../assets/list1.jpg";
// import list2 from "../assets/list2.jpg";
// import list3 from "../assets/list3.jpg";
// import list4 from "../assets/list4.webp";
// import list5 from "../assets/list5.webp";
// import list6 from "../assets/list6.webp";

// // Thumbnail Row Data
// const shows = [
//   { src: list1, alt: "Aap Jaisa Koi", path: "/watch1" },
//   { src: list2, alt: "Squid Game", path: "/watch2" },
//   { src: list3, alt: "Movie 3", path: "/watch3" },
//   { src: list4, alt: "Movie 4", path: "/watch4" },
//   { src: list5, alt: "Movie 5", path: "/watch5" },
//   { src: list6, alt: "Movie 6", path: "/watch6" },
// ];

// // Top 10 Trends Data
// const topTen = [one, two, three, four, five, six, seven, eight, nine, ten];

// // Thumbnail Row Component
// function ThumbnailRow({ title, items = shows }) {
//   return (
//     <div className="relative px-8 py-10 text-white bg-[#141414]">
//       <h2 className="font-semibold text-[17px] mb-3">{title}</h2>
//       <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
//         {items.map((item, index) => (
//           <Link to={item.path || "#"} key={index}>
//             <img
//               src={item.src || item}
//               alt={item.alt || `Thumbnail ${index + 1}`}
//               className="w-60 rounded cursor-pointer transition-transform hover:scale-105"
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Trends Component (Top 10 in India Today)
// function Trends({ title }) {
//   return (
//     <div className="px-8 py-10 text-white bg-[#141414]  ">
//       <h2 className="font-semibold text-[17px] mb-3">{title}</h2>
//       <div className="flex gap-8 overflow-x-auto hide-scrollbar">
//         {topTen.map((url, index) => (
//           <div key={index} className="relative min-w-[150px]">
//             <img src={url} alt={`Top ${index + 1}`} className="rounded-2xl" />
//             <div className="text-8xl font-bold absolute bottom-0 left-[-25px] text-stroke-white text-white drop-shadow-lg">
//               {index + 1}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Main Section Component
// function MiddSection() {
//   return (
//     <div className="bg-black">
//       <ThumbnailRow title="Your Next Watch" />
//       <ThumbnailRow title="Trending Now" />
//       <ThumbnailRow title="Top 10 in India Today" />
//       <Trends title="Top 10 Movies in India Today" />
//       <ThumbnailRow title="New & Popular" />
//       <ThumbnailRow title="Popular on Netflix" />
//       <ThumbnailRow title="Top Picks for You" />
//       <ThumbnailRow title="My List" />
//       <ThumbnailRow title="Watch It Again" />
//     </div>
//   );
// }

// export default MiddSection;



// export default function List() {
//   console.log("List component loaded"); // 🐞 Add this

//   return (
//     <div className="list">
//       <h1 style={{ color: "red" }}>Hello from List</h1>
//     </div>
//   );
// }