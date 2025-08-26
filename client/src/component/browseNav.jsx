import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import netflix from "../assets/netflix-logo-icon.svg";
import bad from "../assets/bad.webp";
import badtext from "../assets/badtext.webp";
import "../index.css";
import netflix_spinner from "../assets/netflix_spinner.gif";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import trailer_video from "../assets/HhesaQXLuRY.webm";
import { useMovies } from "../store/moviesStore.jsx";
import { useNavigate } from "react-router-dom";
function BrowseNav({ type }) {
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const { movies, prefetchMovies } = useMovies();

  // Define homeMovies from Blockbuster category or fallback to empty array
  const homeMovies = movies?.Blockbuster_movies || [];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const navigate = useNavigate();
  const cardsRef = useRef();
  const handleSignOut = () => {
    // Clear all user data
    localStorage.removeItem("user"); // or localStorage.clear() if you want to remove everything
    toast.success("Successfully !");
    // Redirect to login or register page
    setTimeout(() => navigate("/register"), 3000); // or "/register" depending on your flow
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    if (!homeMovies || homeMovies.length === 0) {
      prefetchMovies();
    }
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  const navRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const user_auth = async (event) => {
      event.preventDefault();
      setLoading(true);
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      setLoading(false);
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const [type, setType] = useState(null);
  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background */}
      {/* <img
        src={bad}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0 [mask-image:linear-gradient(to_right,transparent,black_75%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_75%)]"
      /> */}
      {/* <iframe
        src="https://www.youtube.com/embed/VFLkMDEO-Xc?autoplay=1&mute=1&controls=0&loop=1&playlist=VFLkMDEO-Xc"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Background Video"
        className="absolute inset-0 w-full h-full object-cover z-0 -mt-1 [mask-image:linear-gradient(to_right,transparent,black_75%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_75%)]"
      /> */}
      {videoError ? (
        // Fallback image
        <img
          src={bad}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover z-0 
          [mask-image:linear-gradient(to_right,transparent,black_75%)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_75%)]"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 -mt-1"
        >
          <source src={trailer_video} type="video/mp4" />
        </video>
      )}

      <div className="overlay">{/* Your overlay content here */}</div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-transparent"></div>

      {/* Navbar */}
      <div className=" relative  ">
        <div
          className=" fixed flex justify-between items-center top-0 left-0 w-full  px-10 py-3.5 z-50  "
          ref={navRef}
        >
          <div className="flex items-center space-x-8 cursor-pointer   ">
            {/* Netflix SVG */}
            <img src={netflix} alt="Netflix" className="w-10 h-10" />

            <ul className="flex space-x-6 text-sm ">
              {[
                ["Home", "/"],
                ["TV Shows", "/tv"],
                ["Movies", "/movies"],
                ["Games", "/games"],
                ["New & Popular", "/new"],
                ["My List", "/list"],
                ["Browse by Languages", "/browse"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="hover:text-gray-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <FaSearch
              className="cursor-pointer hover:text-gray-300"
              size={18}
            />
            <span className="cursor-pointer hover:text-gray-300">Children</span>
            <FaBell className="cursor-pointer hover:text-gray-300" size={18} />
            <div className="relative group flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Profile"
                className="h-8 w-8 rounded cursor-pointer"
              />
              <MdArrowDropDown className=" ml-1 cursor-pointer group-hover:rotate-180 transition-transform duration-300 flex flex-col" />

              <div className="absolute right-0 top-10 hidden group-hover:block bg-black bg-opacity-90 text-white rounded shadow-md w-44 z-50 ">
                <ul className="p-2 text-sm">
                  <li className="hover:bg-gray-700 px-3 py-2 rounded">
                    Manage Profiles
                  </li>
                  <li className="hover:bg-gray-700 px-3 py-2 rounded">
                    Account
                  </li>
                  <li className="hover:bg-gray-700 px-3 py-2 rounded">
                    Help Center
                  </li>
                  <Link onClick={handleSignOut}>
                    <li className="hover:bg-gray-700 px-3 py-2 rounded text-red-500">
                      Sign Out
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-[80%] -left-40 z-30 w-full max-w-xl flex flex-row justify-center items-center gap-x-3">
        <span className="text-2xl leading-none font-semibold text-white">
          {type === "movies" ? "Movies" : "Series"}
        </span>
        <div className="bg-black py-2 px-2 rounded-md opacity-90">
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            className="text-white outline-none border-none appearance-none"
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="absolute bottom-[300px] left-10 z-20 max-w-xl space-y-6">
        <div className="flex items-center space-x-2">
          <img src={netflix} className="w-5" />
          <span className="text-[10px] font-bold">FILM</span>
        </div>
        <img src={badtext} alt="Title" className="w-80" />
        <p className="text-sm">
          "Bryan Cranston scored four Emmys for his portrayal of a father who
          sells meth to support his family in what Forbes calls the Best Show
          Ever""
        </p>
        <div className="flex items-center space-x-4 mt-4">
          <Link to="/player">
            <button className="flex items-center bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
          </Link>
          <button className="flex items-center bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-500">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </button>
        </div>
      </div>

      {/* Mute + Rating */}
      <div className="absolute bottom-[320px] right-10 z-20 flex items-center space-x-2">
        <button
          onClick={toggleMute}
          className="bg-black/50 rounded-full p-3 hover:bg-black/70 transition cursor-pointer"
        >
          {isMuted ? (
            <FaVolumeMute className="text-gray-300 text-lg" />
          ) : (
            <FaVolumeUp className="text-gray-300 text-lg" />
          )}
        </button>

        <div className="px-2 py-1 bg-black opacity-60 text-white rounded text-sm">
          U/A 13+
        </div>
      </div>
      {/* Thumbnail Row */}
      <div className="absolute bottom-0.5 left-5 text-white w-full rounded-xl mb-0 px-5 py-3 overflow-x-auto scrollbar-hide">
        <span className="font-semibold text-[17px] block mb-4">
          {type ? type : "Blockbuster movies"}
        </span>

        <div className="flex space-x-2 cursor-pointer" ref={cardsRef}>
          {homeMovies &&
          homeMovies.filter((movie) => movie.Poster && movie.Title).length >
            0 ? (
            homeMovies
              .filter((movie) => movie.Poster && movie.Title)
              .map((movie, idx) => (
                <Link
                  to="/player"
                  key={idx}
                  className="relative w-[140px] flex-shrink-0"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full rounded-2xl transition-transform"
                  />
                  <div className="absolute bottom-0 left-0 right-3 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs font-medium truncate">
                      {movie.Title}
                    </p>
                  </div>
                </Link>
              ))
          ) : (
            <p className="text-gray-400">No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseNav;
