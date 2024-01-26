import React from "react";

import Navbar from "../components/Navbar";
import CreateAd from "../components/forms/CreateAd/CreateAd";
import "./../App.css";

export function Create() {
  return (
    <div className="w-full dark">
      <Navbar />
      <CreateAd />
    </div>
  );
}
