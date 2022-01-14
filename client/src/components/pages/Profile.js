import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import GoogleLogin from "react-google-login";

import "../../utilities.css";
import "./Profile.css";

import { get, post } from "../../utilities.js";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-5h5pbkhftbnlhumb5t3rtfm9hq1gv5rv.apps.googleusercontent.com";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!userId) {
    return (
      <div>
        <h3> Sign in here: </h3>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={props.handleLogin}
          onFailure={(err) => console.log(err) /*redirect to sign up page or alert maybe? */}
        />
      </div>
    );
  } else if (!user) {
    return <div> Loading! </div>;
  } else {
    return (
      <div>
        <h1>Profile Page</h1>
        <div>
          <ProfileCard username={user.name} usertarget={user.target} userimg_loc={user.img_loc} />
          <ItemList />
        </div>
      </div>
    );
  }
};

export default Profile;
