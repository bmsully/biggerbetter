import React, { Component, useState } from "react";
import { useNavigate } from "@reach/router";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./LogIn.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const LogIn = ({ userId, handleLogin }) => {
  const navigate = useNavigate();

  //Will need image upload

  //Will need to send data

  //Will need google login button too

  async function redirect(res) {
    await handleLogin(res);
    navigate(`/`);
  }

  return (
    <div>
      <h1>Sign Up/Log In Page</h1>
      <h3> Please login with google</h3>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={redirect}
        onFailure={(err) => console.log(err)}
      />
    </div>
  );
};

export default LogIn;
