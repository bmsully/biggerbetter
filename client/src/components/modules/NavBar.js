import React, { Component } from "react";
import { Link, useNavigate } from "@reach/router";
import { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogout, children }) => {
  return (
    <>
      <nav>
        <div>BiggerBetter</div>
        <div>
          <Link to="/">Home</Link>
          {userId && (
            <>
              <Link to="/explore">Explore</Link>
              <Link to="/trades">Trades</Link>
              <Link to={`/profile/${userId}`}>Profile</Link>
            </>
          )}
        </div>
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <div>
            <Link to="/login" className="NavBar-linkAsButton">
              Sign In
            </Link>
          </div>
        )}
      </nav>
      {children}
    </>
  );
};

export default NavBar;
