import React, { Component, useState } from "react";
import { useNavigate } from "@reach/router";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./LogIn.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const LogIn = ({ userId, handleLogin }) => {
  const [nextPressed, setNextPressed] = useState(false);
  const [item, setItem] = useState("");

  const navigate = useNavigate();

  //Will need image upload

  //Will need to send data

  //Will need google login button too

  const showNext = (props) => {
    // const addComment = (data) => {
    //   //we get data.name and data.target returned from
    //   const body = { parent: props.storyId, content: value };
    //   post("/api/comment", body).then((comment) => {
    //     // display this comment on the screen
    //     props.addNewComment(comment);
    //   });
    // };
  };

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const redirect = () => {
    handleLogin;
    navigate(`/profile/${userId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNextPressed(true);
    setItem("");
  };

  return (
    <div>
      <h1>Sign Up/Log In Page</h1>
      {nextPressed ? (
        <>
          <h3> Please also login with google</h3>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={redirect}
            onFailure={(err) => console.log(err)}
          />
        </>
      ) : (
        <div>
          <input type="text" placeholder={"Target item"} value={item} onChange={handleChange} />
          <button type="Submit" onClick={handleSubmit}>
            Next
          </button>
          <div> still need to add profile photo upload </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
