"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function ProfileBanner() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
        <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
          Welcome User!
        </p>
        <p className="max-w-4xl text-base text-gray-600 md:text-xl">
          Take a Look at your posts!
        </p>
      </div>
      <NavLink to="/create">
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Create
        </button>
      </NavLink>

      {/* posts */}

      {/* footer */}
      <div className="mx-auto mt-12 max-w-7xl bg-gray-50"></div>
    </div>
  );
}
