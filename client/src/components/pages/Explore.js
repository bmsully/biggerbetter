import React, { Component, useEffect, useState } from "react";
import ExploreList from "../modules/ExploreList.js";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Explore.css";

/**
 * Explore is a page
 *
 * @param {String} userId is the id of the active user
 */

const Explore = (props) => {
  return (
    <>
      <h1>Explore Page</h1>
      {props.userId ? (
        <>
          <h2>Currently Exploring</h2>
          <form action="#">
            <select name="City">
              <option>Boston</option>
              <option disabled>other cities soon!</option>
            </select>
          </form>
          <ExploreList userId={props.userId} />
        </>
      ) : (
        <>
          <h2> Please log in to see this page </h2>
          <Link to="/login" className="Explore-linkAsButton">
            Get Started
          </Link>
        </>
      )}
    </>
  );
};

export default Explore;
