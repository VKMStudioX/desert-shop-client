import React from "react";
import BestSellers from "../components/home/BestSellers";
import TopAlbums from "../components/home/TopAlbums"
import Hero from "../components/home/Hero"

const Home = () => {
  return (
    <>
    <Hero />
    <BestSellers />
    <TopAlbums />
    </>
  );
};

export default Home;
