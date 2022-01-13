import React, { Component, useState } from "react";
import NewSignUp from "../modules/NewSignUp.js";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./SignUp.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const SignUp = ({ handleLogin }) => {
  const [nextPressed, setNextPressed] = useState(false);
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [image, setImage] = useState(null);

  //Need text parsing functions

  //Will need image upload

  //Will need to send data

  //Will need google login button too

  /**
   *
   * Proptypes
   * @param {string} defaultText is the placeholder text
   * @param {string} storyId to add comment to
   * NOTE TO BRADY - pass in defaultText when working on this in future
   */

  const showNext = (props) => {
    setNextPressed(true);
    setName(props.name);
    setItem(props.item);
    // const addComment = (data) => {
    //   //we get data.name and data.target returned from
    //   const body = { parent: props.storyId, content: value };
    //   post("/api/comment", body).then((comment) => {
    //     // display this comment on the screen
    //     props.addNewComment(comment);
    //   });
    // };
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      {nextPressed ? (
        <>
          <h3> Please also login with google</h3>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        </>
      ) : (
        <>
          <NewSignUp defaultName="" defaultItem="" onSubmit={showNext} />
          <div> still need to add profile photo upload </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
