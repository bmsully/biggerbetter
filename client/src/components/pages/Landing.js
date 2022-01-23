import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import "../../utilities.css";
import "./Landing.css";

/**
 * Landing is a page with general information about BiggerBetter
 *
 * @param {String} userId id of active user
 */

const Landing = ({ userId }) => {
  return (
    <>
      <h1 className="u-headerFont">BiggerBetter Landing Page</h1>
      <h2>Here are some things that will appear on this page</h2>
      <ul>
        <li>What BiggerBetter is!</li>
        <li>The story of Kyle MacDonald (red paper clip guy)</li>
        <li>Kyle MacDonald Ted Talk!</li>
        <li>The story of the tiktok bobby pin girl and links!</li>
        <li>Instructions on how to use with photos/gifs!</li>
      </ul>
      {userId ? (
        <></>
      ) : (
        <div className="u-flexColumn u-flex-alignCenter">
          <h3 className="">Start Trading!</h3>
          <Button href="/login" className="">
            Get Started
          </Button>
        </div>
      )}
    </>
  );
};

export default Landing;
