import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";

import "../../utilities.css";
import "./Profile.css";

import { get } from "../../utilities.js";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
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
