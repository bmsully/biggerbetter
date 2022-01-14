import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";

import "../../utilities.css";
import "./ProfileCard.css";

// NOTE TO BRADY - update profile pic url

const ProfileCard = ({ username, usertarget, userimg_loc }) => {
  return (
    <div>
      <h2>Profile Card</h2>
      <img src={defaultProfilePic} className="ProfileCard-img" />
      <h3>Name: {username}</h3>
      <h4>Target Item: {usertarget}</h4>
    </div>
  );
};

export default ProfileCard;
