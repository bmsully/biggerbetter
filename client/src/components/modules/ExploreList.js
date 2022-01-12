import React, { Component } from "react";
import ExploreCard from "./ExploreCard.js";

import "../../utilities.css";
import "./ExploreList.css";

const ExploreList = () => {
  return (
    <div>
      <h2>ExploreList </h2>
      <h3>Exploring Boston</h3>
      <ExploreCard />
      <ExploreCard />
      <ExploreCard />
    </div>
  );
};

export default ExploreList;
