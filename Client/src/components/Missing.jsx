import React from "react";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Missing() {
  return (
    <div className="py-10">
      <div className="text-center">
        <p className="text-base font-semibold text-black">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Whoops! Looks like you are on the wrong path..😐
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <NavLink to="/">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
