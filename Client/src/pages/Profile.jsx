import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { ProfileBanner } from "../components/common/Profile/ProfileBanner.jsx";
import Breadcrumbs from "../components/common/Profile/Breadcrumbs.jsx";
import Posts from "../components/common/Profile/Posts.jsx";
import fetchAds from "../services/fetchAds.js";

const Profile = () => {
  {/*Setting the ads state*/}
  const [posts, setPosts] = useState();

  {/*Fetching on the ADS by the user*/}
  useEffect(() => {
    const fetchAllAds = async () => {
      setPosts(await fetchAds());
    };
    fetchAllAds();
  }, []);
 
  
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2">
        <ProfileBanner />
        <Breadcrumbs />
        <Posts ads={posts?.advertisements} />
      </div>
    </div>
  );
};

export default Profile;
