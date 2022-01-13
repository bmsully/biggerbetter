import React, { Component, useState } from "react";

import "../../utilities.css";
import "./SignUp.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const SignUp = ({ handleLogin }) => {
  const [nextPressed, setNextPressed] = useState(false);
  const [nameEntry, setNameEntry] = useState("");
  const [targetItem, setTargetItem] = useState("");
  const [image, setImage] = useState(null);
  //Need text entry functions

  //Need text parsing functions

  //Will need image upload

  //Will need to send data

  //Will need google login button too

  return (
    <div>
      <h1>Sign Up Page</h1>
      <h2>Name:</h2>
      <input type="" defaultValue="" />
      <h3>Target Item:</h3>
      <input type="" defaultValue="" />
      <div>
        <h3>Profile Photo:</h3>
      </div>
      <button>Next</button>
    </div>
  );
};

export default SignUp;
