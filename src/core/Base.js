import React from "react";
import Menu from "./Menu";

const Base = (
    {
        title = "My title",
        description = "My description",
        className = "bg-dark text-white p-4",
        children
    }
) => (
  <div>
    <Menu/>
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4"> {title}</h2>
                <p className="lead">{ description}</p>
      </div>
            <div className={className}>{ children}</div>
    </div>
    <p className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center">
                <h4>If you got any questions, please feel free to reach out!</h4>
                <button className="container">Contact Us</button>
      </div>
            <div className="container">
                <span className="text-muted">An Amazing <span className="text-white">MERN</span> Bootcamp</span>
      </div>
    </p>
  </div>
);
export default Base;
