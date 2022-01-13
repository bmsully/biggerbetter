import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "@reach/router";
import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./Landing.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const Landing = ({ userId, handleLogin, handleLogout, children }) => {
  return (
    <>
      {/* <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} /> */}
      <h1>BiggerBetter Landing Page</h1>
      <h2>Here are some things that will appear on this page</h2>
      <ul>
        <li>What BiggerBetter is!</li>
        <li>The story of Kyle MacDonald (red paper clip guy)</li>
        <li>The story of the tiktok bobby pin girl and links!</li>
        <li>Instructions on how to use with photos/gifs!</li>
      </ul>
      <h2>From Weblab staff:</h2>
      <a href="http://weblab.to/get-started">Check out this getting started guide</a>
      {userId ? (
        <></>
      ) : (
        <div>
          <h3>Get Started!</h3>
          <Link to="/signup" className="Landing-linkAsButton">
            Sign up!
          </Link>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err) /*redirect to sign up page or alert maybe? */}
          />
        </div>
      )}
      {/* {children} */}
    </>
  );
};

export default Landing;
