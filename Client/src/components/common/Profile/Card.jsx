import React from "react";
import { NavLink } from "react-router-dom";
import deleteAd from "../../../services/deleteAd";

const Card = ({ post, carousel }) => {
  const imgURL = post.multimedia.split("ipfs://");
  const handleDeleteAd = async () => {
    await deleteAd(post._id);
  };

  return (
    <div key={post.title} style={{height:"52%"}} className=" relative rounded-md ">
      <img
        src={`https://ipfs.io/ipfs/${imgURL[1]}`}
        className="aspect-video w-full object-cover rounded-md first-line:rounded-md"
        alt=""
      />
      <div className="min-h-min p-3">
        {carousel ? (
          <div></div>
        ) : (
          <div>
            <p className="mt-4 flex-1 text-2xl font-semibold text-gray-900">
              {post.title}
            </p>
            <p className="mt-4 w-full text-md mb-4 leading-normal text-gray-600">
              {post.description}
            </p>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Target Audience:
            </h2>
            <ul className="max-w-md space-y-1 mb-4 text-gray-500 list-inside dark:text-gray-400">
              {post.target_audience.map((element) => (
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {element}
                </li>
              ))}
            </ul>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Scheduling Information:
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {`Scheduled`}
              </li>

              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 me-2 text-black-500 dark:text-green-400 flex-shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {`${post.duration.startDate} - ${post.duration.endDate}`}
              </li>
            </ul>
            <div className=" absolute right-0 bottom-0 mt-8 mb-2 flex justify-between space-x-3 ">
              <NavLink to={`/edit/${post._id}`}>
                <button
                  type="button"
                  className="rounded-full opacity-90 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Edit
                </button>
              </NavLink>
              <button
                type="button"
                onClick={handleDeleteAd}
                className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
