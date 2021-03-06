import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4"> {title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <div className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center">
        <h4>If you got any questions, please feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">T-Shirt</span> store
        </span>
      </div>
    </div>
  </div>
);
export default Base;
