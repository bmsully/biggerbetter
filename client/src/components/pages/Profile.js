import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import EditProfile from "../modules/EditProfile.js";
import Button from "react-bootstrap/Button";

import "../../utilities.css";
import "./Profile.css";

import { get, post } from "../../utilities.js";

/**
 * Profile is a page that displays user information
 * @param {String} userId id of active user
 * @param {String} userid id of users profile page
 */

const Profile = (props) => {
  const [user, setUser] = useState();

  const onSubmit = (newProfileInfo) => {
    const query = { userId: props.userId, newInfo: newProfileInfo };
    post("/api/user", query).then((userObj) => {
      setUser(userObj);
    });
  };

  useEffect(() => {
    get("/api/user", { userid: props.userid }).then((userObj) => setUser(userObj));
  }, []);

  if (!props.userId) {
    return (
      <div className="u-flexColumn u-flex-alignCenter Profile-bg">
        <h2 className="u-headerFont Profile-whitetext"> Please log in to see this profile </h2>
        <Button href="/login" className="">
          Get Started
        </Button>
      </div>
    );
  } else if (!user) {
    return <div className="Profile-whitetext"> Loading! </div>;
  } else {
    return (
      <div className="Profile-bg">
        <ProfileCard username={user.name} usertarget={user.target} userimg_loc={user.img_loc} />
        {props.userId === props.userid && (
          <EditProfile onSubmit={onSubmit} defaultItem={user.target} />
        )}
        <ItemList userid={props.userid} userId={props.userId} />
      </div>
    );
  }
};

export default Profile;
