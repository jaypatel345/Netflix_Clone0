// /pages/Home.jsx (or wherever it is)
import React from "react";
import BrowseNav from "../component/browseNav";
import Browsefooter from "../component/browsefooter";
import List from "../component/list";
import { useMovies } from "../store/moviesStore";

function Home() {
  const { loading, error } = useMovies();

  return (
    <div className="relative bg-black text-white">
      <BrowseNav />
      <div className="mt-[30px]">
        {loading && (
          <p className="px-5 text-sm text-neutral-300">Loading movies…</p>
        )}
        {error && <p className="px-5 text-sm text-red-400">{error}</p>}

        <List title="Action movies" categoryKey="Action_movies" />
        <List title="Comedy movies" categoryKey="Comedy_movies" />
        <List title="Drama movies" categoryKey="Drama_movies" />
        <List title="Horror movies" categoryKey="Horror_movies" />
        <List title="SciFi movies" categoryKey="SciFi_movies" />
        <List title="Animation movies" categoryKey="Animation_movies" />
        <List title="Romance movies" categoryKey="Romance_movies" />
        <List title="Thriller movies" categoryKey="Thriller_movies" />
        <List title="Mystery movies" categoryKey="Mystery_movies" />
      </div>
      <Browsefooter />
    </div>
  );
}

export default Home;
