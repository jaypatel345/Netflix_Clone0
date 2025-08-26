// /component/list.jsx
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import "../index.css";
import { useMovies } from "../store/moviesStore";

const placeholder = "https://via.placeholder.com/300x450?text=No+Image";

const List = ({ title, categoryKey }) => {
  const cardsRef = useRef();
  const { movies } = useMovies();

  const items = movies?.[categoryKey] || [];

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  if (!movies || Object.keys(movies).length === 0) {
    return <p className="text-white text-sm">Loading movies...</p>;
  }

  return (
    <div className="relative left-5 mb-6 w-full">
      <span className="font-semibold text-[17px] block mb-2">
        {title || "Trending Now"}
      </span>

      <div
        className="flex space-x-2 overflow-x-scroll transition-all duration-500 scrollbar-hide"
        ref={cardsRef}
      >
        {items.length > 0 ? (
          items.map((it, idx) => {
            // Normalize in case provider hasn’t fetched details yet
            const movie =
              typeof it === "string" ? { imdbID: it, Title: it, Poster: null } : it;

            const key = movie.imdbID || idx;
            const name = movie.Title || movie.imdbID || "Untitled";
            const poster =
              movie.Poster && movie.Poster !== "N/A" ? movie.Poster : placeholder;

            return (
              <Link
                to={`/player/${movie.imdbID}`}
                key={key}
                className="relative w-[140px] flex-shrink-0"
              >
                <img
                  src={poster}
                  alt={name}
                  className="w-full h-full cursor-pointer rounded-2xl transition-transform"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs font-medium truncate">{name}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-white text-sm">No movies available</p>
        )}
      </div>
    </div>
  );
};

export default List;
