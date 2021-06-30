import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  // const imageUrl = product
  //   ? `${API}/product/photo/${product._id}`
  //   : `https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  const imageUrl =
    "https://drive.google.com/file/d/1yGuajEhDY7Ofy8apq3cb-EaJzfdoTn6E/view?usp=sharing";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};
export default ImageHelper;
