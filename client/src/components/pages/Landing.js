import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Landing.css";

const Landing = ({ userId }) => {
  return (
    <>
      {/* <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} /> */}
      <h1>BiggerBetter Landing Page</h1>
      <h2>Here are some things that will appear on this page</h2>
      <ul>
        <li>What BiggerBetter is!</li>
        <li>The story of Kyle MacDonald (red paper clip guy)</li>
        <li>Kyle MacDonald Ted Talk!</li>
        <li>The story of the tiktok bobby pin girl and links!</li>
        <li>Instructions on how to use with photos/gifs!</li>
      </ul>
      <h2>From Weblab staff:</h2>
      <a href="http://weblab.to/get-started">Check out this getting started guide</a>
      {userId ? (
        <></>
      ) : (
        <div>
          <h3>Start Trading!</h3>
          <Link to="/login" className="Landing-linkAsButton">
            Get Started
          </Link>
        </div>
      )}
      {/* {children} */}
    </>
  );
};

export default Landing;
