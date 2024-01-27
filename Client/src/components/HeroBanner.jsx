import React from "react";

const HeroBanner = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">Let's&apos; create</p>
            </div>
            <p className="text-sm font-medium">Join our team &rarr;</p>
          </div>
          <h1
            id="#title-1"
            className="mb-10 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            Regain{" "}
            <mark className="px-2 text-white bg-black rounded ">
              control
            </mark>{" "}
            over your Ads<span className="px-4 bg:none text-black">.</span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl ">
            Here at AdManager we let you in a role based scenario.
            <span className=" px-2 text-2xl  font-bold bg:none text-black">
              Everything
            </span>
            is under your{" "}
            <span className=" text-2xl  font-bold bg:none text-black">
              Control.
            </span>
          </p>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
            src="https://cdn.discordapp.com/attachments/1095282010970398864/1200148140645433425/pexels-nextvoyage-3030647.jpg?ex=65c5200e&is=65b2ab0e&hm=bcf84f899b347a61ae6d0f7b43f358fdc7cfc5740863bef55bbb4e1ca9d9eb06&"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
