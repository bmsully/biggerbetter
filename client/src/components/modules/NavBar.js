import React, { Component } from "react";
import { Link, useNavigate } from "@reach/router";
import { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-mrho1ed88dmqm4m50sgi7pmo2sttogsb.apps.googleusercontent.com";

/**
 * NavBar is a Navigation Bar Component that appears at the top of all pages
 *
 * @param {String} userId id of active user
 * @param {Function} handleLogout logs out the active user
 * @param {Component} children active web page
 */
const NavBar = ({ userId, handleLogout, children }) => {
  const navigate = useNavigate();

  const redirect = (res) => {
    handleLogout(res);
    navigate(`/`);
  };

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
            onLogoutSuccess={redirect}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <div>
            <Link to="/login" className="NavBar-linkAsButton">
              Get Started
            </Link>
          </div>
        )}
      </nav>
      {children}
    </>
  );
};

export default NavBar;
