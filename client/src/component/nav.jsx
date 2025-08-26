import React from "react";
import netflixHome from "../assets/netflix_Home.jpg";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="px-30 py-3 bg-black text-white z-10 ">
        <div
          className=" absolute inset-0 bg-cover bg-center opacity-23"
          style={{ backgroundImage: `url(${netflixHome})` }}
        ></div>
        <div className="relative z-0">
          <div className="flex justify-between items-center -mt-10  ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="150"
                height="150"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#e50914"
                  d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"
                ></path>
              </svg>
            </div>
            <div className="flex">
              <div>
                <select
                  className="pr-25 border p-1 mr-2 border-gray-600"
                  name=""
                  id=""
                >
                  <option vlaue="English">English</option>
                  <option vlaue="Hindi">Hindi</option>
                  <option vlaue="Gujarati">Gujarati</option>
                </select>
              </div>
              <Link
                to="/login"
                className="bg-red-700 px-4 py-1 rounded text-white font-semibold hover:bg-red-700"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="py-20 flex  flex-col  items-center ">
            <div className="text-6xl font-bold w-150 text-center ">
              Unlimited movies, TV shows and more
            </div>
            <div className="py-5 font-bold text-[18px]">
              Starts at ₹149. Cancel at any time.
            </div>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="py-10 ">
              <input
                className="border p-2 border-gray-500 pr-30 mr-5"
                type="text"
                placeholder="Email address"
              />

              <Link to="/signup">
                <button className="bg-[#e50914] rounded p-3 px-7 py-3 font-bold text-white hover:bg-red-700 transition duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
