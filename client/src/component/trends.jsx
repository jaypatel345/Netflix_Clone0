import React, { useEffect, useRef } from "react";
import one from "../assets/one.webp";
import two from "../assets/two.webp";
import three from "../assets/three.webp";
import four from "../assets/four.webp";
import five from "../assets/five.webp";
import six from "../assets/six.webp";
import seven from "../assets/seven.webp";
import eight from "../assets/eight.webp";
import nine from "../assets/nine.webp";
import ten from "../assets/ten.webp";

function Trends() {
  const movies = [
    {
      id: 1,
      url: one,
    },
    {
      id: 2,
      url: two,
    },
    {
      id: 3,
      url: three,
    },
    {
      id: 4,
      url: four,
    },
    {
      id: 5,
      url: five,
    },
    {
      id: 6,
      url: six,
    },
    {
      id: 7,
      url: seven,
    },
    {
      id: 8,
      url: eight,
    },
    {
      id: 9,
      url: nine,
    },
    {
      id: 10,
      url: ten,
    },
  ];
  const cardsRef = useRef();
  
    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };
    useEffect(() => {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }, []);
  return (
    <>
      <div className="pt-60  ">
        <div className="font-bold px-20  text-2xl ">Trending Now</div>
        <div className="flex gap-10 pl-25   overflow-scroll  hide-scrollbar cursor-pointer" ref={cardsRef}>
          {movies.map((movie, index) => {
            return (
              <div key={index} className="pt-5 relative">
                <img
                  className="rounded-2xl min-w-[150px]"
                  src={movie.url}
                  alt=""
                />
                <div className="text-8xl font-bold absolute bottom-0 left-[-25px] text-stroke-white">
                  {movie.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Trends;
