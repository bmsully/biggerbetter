import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";

import "../../utilities.css";
import "./ProfileCard.css";

// NOTE TO BRADY - update profile pic url

/**
 * ProfileCard is a Component displaying info about a user
 *
 * @param {String} username name of user being displayed
 * @param {String} usertarget is the target item of user being displayed
 * @param {String} userimg_loc url of profile image of user being displayed
 */

const ProfileCard = ({ username, usertarget, userimg_loc }) => {
  return (
    <div>
      <h2>Profile Card</h2>
      <img
        src={userimg_loc === "default" ? defaultProfilePic : userimg_loc}
        className="ProfileCard-img"
      />
      <h3>Name: {username}</h3>
      <h4>Target Item: {usertarget}</h4>
    </div>
  );
};

export default ProfileCard;
