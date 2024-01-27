import React from "react";
import Card from "./Card";
import NoPosts from "../Home/NoPosts";
// import NoPosts from "../Home/NoPosts";
const Posts = ({ ads }) => {
  console.log(ads);
  return (
    <div>
      {ads?.length > 0 ? (
        <div className="grid gap-10 gap-y-10 relative py-6 mb-10 md:grid-cols-2 lg:grid-cols-3">
          {ads?.map((post) => (
            <Card post={post} />
          ))}
        </div>
      ) : (
        <div>
          <NoPosts />
        </div>
      )}
    </div>
  );
};

export default Posts;
