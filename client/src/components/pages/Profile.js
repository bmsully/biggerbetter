import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import { Link } from "@reach/router";
import Modal from "react-bootstrap/Modal";

import "../../utilities.css";
import "./Profile.css";

import { get } from "../../utilities.js";

const Profile = (props) => {
  const [user, setUser] = useState();

  //we get userId and userid from props
  //userid is for get(`/api/user`)
  //userId is for checking if logged in

  useEffect(() => {
    get(`/api/user`, { userid: props.userid }).then((userObj) => setUser(userObj));
  }, []);

  <Modal />;

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
          {props.userId === props.userid && <button>Edit Profile</button>}
          <ItemList />
        </div>
      </div>
    );
  }
};

export default Profile;
