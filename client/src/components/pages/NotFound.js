import React from "react";

import "../../utilities.css";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound-bg u-textCenter">
      <h1 className="u-headerFont NotFound-title">404 Not Found</h1>
      <div className="u-bodyFont NotFound-subtitle">The page you requested couldn't be found.</div>
    </div>
  );
};

export default NotFound;
