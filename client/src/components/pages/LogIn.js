import React, { Component, useState } from "react";
import { useNavigate } from "@reach/router";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./LogIn.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-mrho1ed88dmqm4m50sgi7pmo2sttogsb.apps.googleusercontent.com";

/**
 * LogIn is a page
 *
 * @param {String} userId id of active user
 * @param {Function} handleLogin logs in the active user
 */

const LogIn = ({ userId, handleLogin }) => {
  const navigate = useNavigate();

  const redirect = (res) => {
    handleLogin(res);
    navigate(`/`);
  };

  return (
    <div className="LogIn-bg u-flex u-flex-justifyCenter u-flex-alignCenter">
      <div className="LogIn-card u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
        <h3 className="u-headerFont LogIn-title"> Please login with google</h3>
        <h4 className="u-bodyFont LogIn-subtitle">
          If you are new, an account will be made for you upon log-in
        </h4>
        <div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={redirect}
            onFailure={(err) => console.log(err)}
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
