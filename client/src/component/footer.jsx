import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-6 -pt-20 pb-16 text-sm">
      {/* Email Section */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white text-lg mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            className="bg-black border border-gray-600 text-white px-4 py-3 w-[300px] sm:w-[400px] rounded"
            type="text"
            placeholder="Email address"
          />
          <button className="bg-[#e50914] hover:bg-red-700 text-white font-bold px-6 py-3 rounded">
            Get Started
          </button>
        </div>
      </div>

      {/* Help Grid Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <p className="mb-6">
          Questions? Call <span className="underline">000-800-919-1743</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4">
          <ul className="space-y-2">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Speed Test</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Cookie Preferences</a></li>
            <li><a href="#">Legal Notices</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#">Account</a></li>
            <li><a href="#">Ways to Watch</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Only on Netflix</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#">Media Centre</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Language Selector */}
        <div className="mt-6">
          <select
            className="bg-transparent border border-gray-500 text-white px-4 py-2 rounded"
          >
            <option className="text-black">English</option>
            <option className="text-black">Hindi</option>
          </select>
        </div>

        {/* Bottom Note */}
        <div className="mt-10">
          <p className="mb-2">Netflix India</p>
          <p className="text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#" className="text-blue-500 underline">Learn more</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;