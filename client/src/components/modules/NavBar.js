import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav>
      <div>BiggerBetter</div>
      <div>
        <Link to="/">Home</Link>
        {userId && (
          <>
            <Link to="/explore">Explore</Link>
            <Link to="/trades">Trades</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </div>
      {/* {userId && (
          <Link to={`/profile/${userId}`}>
            Profile
          </Link>
        )} */}
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <div>
          <Link to="/signup" className="NavBar-linkAsButton">
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
    </nav>
  );
};

export default NavBar;
