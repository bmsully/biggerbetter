import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";

import "../../utilities.css";
import "./ProfileCard.css";

// NOTE TO BRADY - update profile pic url

const ProfileCard = () => {
  return (
    <div>
      <h2>Profile Card</h2>
      <img src={defaultProfilePic} className="ProfileCard-img" />
      <h3>Name: Brady</h3>
      <h4>Target Item: Hot Dog</h4>
    </div>
  );
};

export default ProfileCard;
