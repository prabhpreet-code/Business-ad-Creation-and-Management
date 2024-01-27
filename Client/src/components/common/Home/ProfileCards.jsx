import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import fetchAllAds from "../../../services/fetchAllAds";
import { geoLocation } from "../../../utils/geoLocation";
import NoPosts from "./NoPosts";

export default function ProfileCards({ location }) {
  {
    /*State for storing advertisments*/
  }

  const [posts, setPosts] = useState();

  {
    /*Fetching Ads based on Location*/
  }
  useEffect(() => {
    if (location != undefined) {
      const getLocatedPosts = async () => {
        setPosts(await fetchAllAds(location));
      };
      getLocatedPosts();
    }
  }, [location]);

  {
    /*Fetching the location from Browser*/
  }
  useEffect(() => {
    geoLocation();
  }, []);


  return (
    <div>
      {posts === undefined || posts.length === 0 ? (
        <div className="w-[90vw] h-[20vh] mt-10 relative pl-14 mb-24">
          <NoPosts />
        </div>
      ) : (
        <div
          className="w-[90vw] h-[60vh] mt-10 relative px-14 mb-20  grid gap-6 gap-y-10 py-6  md:grid-cols-2 lg:grid-cols-3"
        >
          {posts?.map((post) => (
            <HomeCard post={post} key={post.title}/>
          ))}
        </div>
      )}
    </div>
  );
}
