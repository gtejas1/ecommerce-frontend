import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${product.photo}`
    : `https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;

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
