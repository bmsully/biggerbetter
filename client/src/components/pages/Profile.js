import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import { Link } from "@reach/router";
import EditProfile from "../modules/EditProfile.js";

import "../../utilities.css";
import "./Profile.css";

import { get, put } from "../../utilities.js";

const Profile = (props) => {
  const [user, setUser] = useState();

  //we get userId and userid from props
  //userid is for get(`/api/user`) i.e. viewing any random profile
  //userId is for checking if logged in i.e. this is the actual user
  const onSubmit = (newProfileInfo) => {
    const query = { userId: props.userId, newInfo: newProfileInfo };
    put("/user", query).then((userObj) => setUser(userObj));
  };

  useEffect(() => {
    get(`/api/user`, { userid: props.userid }).then((userObj) => setUser(userObj));
  }, []);

  if (!props.userId) {
    return (
      <>
        <h2> Please log in to see this profile </h2>
        <Link to="/login" className="NavBar-linkAsButton">
          Get Started
        </Link>
      </>
    );
  } else if (!user) {
    return <div> Loading! </div>;
  } else {
    return (
      <div>
        <h1>Profile Page</h1>
        <div>
          <ProfileCard username={user.name} usertarget={user.target} userimg_loc={user.img_loc} />
          {props.userId === props.userid && (
            <EditProfile onSubmit={onSubmit} defaultItem={user.target} />
          )}
          <ItemList />
        </div>
      </div>
    );
  }
};

export default Profile;
