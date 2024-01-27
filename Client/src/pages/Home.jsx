import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Features from "../components/common/Home/Features";
import Footer from "../components/Footer";
import Carousel from "../components/common/Home/Carousel";
import "./../App.css";
import { geoLocation } from "../utils/geoLocation";
import { getLocationInfo } from "../utils/getLocationInfo";
import ProfileCards from "../components/common/Home/ProfileCards";

export function Home() {
  {/*Setting up state for user location*/}
  const [location, setLocation] = useState();

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  {/*Fetching the Country*/}
  const success = async (pos) => {
    var crd = pos.coords;
    const currentLocation = await getLocationInfo(crd.latitude, crd.longitude);
    setLocation(currentLocation);
  };
  
  {/*Outletting errors*/}
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  {/*Fetching the location*/}
  useEffect(() => {
    geoLocation(success, errors, options);
  }, []);

  return (
    <div className=" flex flex-col w-[90vw] h-min:100vh">
      <Navbar />
      <HeroBanner />
      <Features />
      <Carousel location={location} />
      <ProfileCards location={location} />
      <Footer />
    </div>
  );
}
