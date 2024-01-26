import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import fetchAllAds from "../../../services/fetchAllAds";
import { geoLocation } from "../../../utils/geoLocation";

export default function ProfileCards({ location }) { 
  {/*State for storing advertisments*/}

  const [posts, setPosts] = useState();

  {/*Fetching Ads based on Location*/}
  useEffect(() => {
    if (location != undefined) {
      const getLocatedPosts = async () => {
        setPosts(await fetchAllAds(location));
      };
      getLocatedPosts();
    }
  }, [location]);
  console.log(posts);

  {/*Fetching the location from Browser*/ }
  useEffect(() => {
    geoLocation();
  }, []);

  return (
    <div className="w-[90vw] h-[60vh] mt-10 relative pl-14 mb-24 grid gap-6 gap-y-10 py-6  md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <HomeCard post={post} />
      ))}
    </div>
  );
}
