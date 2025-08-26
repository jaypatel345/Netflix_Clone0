import React, { useState } from "react";
import { Link } from "react-router-dom";
import netflix_home from "../assets/netflix_Home.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    joined: "",
  });
    const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const onSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", user);
      console.log(res.data);
      toast.success("Successfully SignUp!");
      setTimeout(() => navigate("/login"), 1000);
       setLoading(false);
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error("SignUp failed:");
      throw new Error("Something is wrong in signup API");
    }
  };
  return (
    <div>
      <div className="relative h-screen w-screen bg-black text-white">
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        {/* Background Image */}
        <img
          src={netflix_home}
          alt="Netflix Background"
          className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
        />

        {/* Dark overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/60" />

        {/* Logo */}
        <Link to="/" className=" -mt-10 ">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            className="absolute top-6 left-38 w-40"
          />
        </Link>

        {/* Login Form */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="bg-black/75 p-14 rounded-md max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

            <form className="flex flex-col space-y-4" onSubmit={onSignup}>
              <input
                type="name"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
                className="p-4 bg-neutral-800 rounded text-white focus:outline-none"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email or phone number"
                className="p-4 bg-neutral-800 rounded text-white focus:outline-none"
              />
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="p-4 bg-neutral-800 rounded text-white focus:outline-none"
              />

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 transition-colors p-4 rounded font-semibold"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="flex justify-between items-center text-sm text-neutral-400">
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="accent-red-600" />
                  <span>Remember me</span>
                </label>
                <span className="cursor-pointer hover:underline">
                  Need help?
                </span>
              </div>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-neutral-400">
              New to Netflix?{" "}
              <Link to="/login" className="text-white hover:underline">
                Sign In now
              </Link>
            </p>

            {/* Captcha Note */}
            <p className="mt-4 text-xs text-neutral-500">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <span className="text-blue-500 cursor-pointer">Learn more.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
