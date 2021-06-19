import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2 text-success">Name:</span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2 text-success">
              Email:
            </span>{" "}
            {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome back!"
      description="View all of your information here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div> {userRightSide()}</div>
      </div>
    </Base>
  );
};
export default UserDashboard;
