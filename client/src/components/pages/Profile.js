import React, { Component } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileCard />
      <ItemList />
    </div>
  );
};

export default Profile;
