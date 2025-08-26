import React from "react";
import Nav from "../component/nav";
import Trends from "../component/trends";
import Reasons from "../component/reasons";
import Questions from "../component/questions";
import Footer from "../component/footer";

function register() {
  return (
    <div className="bg-black px-10 text-white">
      <Nav />
      <Trends  />
      <Reasons />
      <Questions />
      <Footer />
    </div>
  );
}

export default register;