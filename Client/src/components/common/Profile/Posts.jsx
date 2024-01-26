import React from "react";
import Card from "./Card";
const Posts = ({ ads }) => {
  return (
    <div style={{height:"25%"}} className="grid gap-10 gap-y-10 relative py-6 mb-10 md:grid-cols-2 lg:grid-cols-3">
      {ads?.map((post) => (
        <Card post={post} />
      ))}
    </div>
  );
};

export default Posts;
