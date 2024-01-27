import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { ProfileBanner } from "../components/common/Profile/ProfileBanner.jsx";
import Breadcrumbs from "../components/common/Profile/Breadcrumbs.jsx";
import Posts from "../components/common/Profile/Posts.jsx";
import fetchAds from "../services/fetchAds.js";
import Footer from "../components/Footer.jsx";

const Profile = () => {
  {
    /*Setting the ads state*/
  }
  const [posts, setPosts] = useState([]);

  {
    /*Fetching on the ADS by the user*/
  }
  useEffect(() => {
    const fetchAllAds = async () => {
      setPosts(await fetchAds());
    };
    fetchAllAds();
  }, []);

  return (
    <div className=" flex flex-col w-[100vw] min-h-[100vh]">
      <Navbar />
      <div className="lg:px-96 sm:px-40 xs:px-40 w-full h-full ">
        <ProfileBanner />
        <Breadcrumbs />
        <Posts ads={posts?.advertisements} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
