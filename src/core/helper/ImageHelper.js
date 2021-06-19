import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src="https://media.istockphoto.com/photos/front-of-men-cut-black-tshirt-isolated-on-white-background-picture-id1142212002?k=6&m=1142212002&s=612x612&w=0&h=kUfL77LrIvxSnZ_XhFyPU9EvgJNooZjP6ixzyHk42Ic="
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};
export default ImageHelper;
