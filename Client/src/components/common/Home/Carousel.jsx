import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import fetchAllAds from "../../../services/fetchAllAds";
import Card from "../Profile/Card";
import { geoLocation } from "../../../utils/geoLocation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Carousel({ location }) {
  const [posts, setPosts] = useState();

   {/*Fetching Location-Based Posts*/}

  useEffect(() => {
    if (location != undefined) {
      const getLocatedPosts = async () => {
        setPosts(await fetchAllAds(location))
      };
      getLocatedPosts();
    }
  }, [location]);
 
  {/*Fetching the Location from Browser*/}

  useEffect(() => {
    geoLocation();
  }, []);

  {/*Settings for Slick Carousel*/}
  
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div style={{ width: "95vw" }} className="flex relative justify-between">
      <div className="px-10 w-[50vw] h-[40vh]">
        <Slider className="w-[50vw] h-[60vw] " {...settings}>
          {posts?.map((post) => (
            <Card post={post} key={post.title} carousel={true} />
          ))}
        </Slider>
      </div>
      <div className="ml-16 px-10">
        <h1
          style={{ lineHeight: 1.43 }}
          className="mb-4 text-4xl  font-extrabold  tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
           Explore  wide range of <br />
          <span className="text-white mt-10 bg-black dark:text-blue-500">
           AD's @
          </span>{" "}
          ADM.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Unlock Advertising Excellence: Your Campaigns, Your Creatives, Your
          Success " All at Your Fingertips with our Ad Mastery Dashboard!"
        </p>
      </div>
    </div>
  );
}
