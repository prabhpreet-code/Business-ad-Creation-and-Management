import React from 'react'

const Breadcrumbs = () => {
  return (
    
      <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
        <div className="flex w-full items-end border-b border-gray-300">
          {[
            "Your Ad's",
          ].map((filter, index) => (
            <div
              className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
              key={filter}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
   
  );
}

export default Breadcrumbs
