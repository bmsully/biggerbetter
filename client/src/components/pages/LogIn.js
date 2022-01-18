import React, { Component, useState } from "react";
import { useNavigate } from "@reach/router";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./LogIn.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const LogIn = ({ userId, handleLogin }) => {
  const navigate = useNavigate();

  const redirect = (res) => {
    handleLogin(res);
    navigate(`/`);
  };

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
