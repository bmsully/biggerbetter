import React, { Component } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./Profile.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const Profile = ({ userId, handleLogin }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      {userId ? (
        <>
          <ProfileCard />
          <ItemList />
        </>
      ) : (
        // this should be a modal!
        <div>
          <h3> Sign in here: </h3>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err) /*redirect to sign up page or alert maybe? */}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
