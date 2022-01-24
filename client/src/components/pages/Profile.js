import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import { Link } from "@reach/router";
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

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    get("/api/user", { userid: props.userid }).then((userObj) => setUser(userObj));
  }, []);

  if (!props.userId) {
    return (
      <div className="u-flexColumn u-flex-alignCenter">
        <h2 className="u-headerFont"> Please log in to see this profile </h2>
        <Button href="/login" className="">
          Get Started
        </Button>
      </div>
    );
  } else if (!user) {
    return <div> Loading! </div>;
  } else {
    return (
      <div>
        <h1 className="u-headerFont">Profile Page</h1>
        <div>
          <ProfileCard username={user.name} usertarget={user.target} userimg_loc={user.img_loc} />
          {props.userId === props.userid && (
            <EditProfile onSubmit={onSubmit} defaultItem={user.target} />
          )}
          <ItemList userid={props.userid} userId={props.userId} />
        </div>
      </div>
    );
  }
};

export default Profile;
