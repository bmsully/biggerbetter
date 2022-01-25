import React, { Component, useState, useEffect } from "react";
import ExploreCard from "./ExploreCard.js";

import "../../utilities.css";
import "./ExploreList.css";

import { get } from "../../utilities.js";

/**
 * ExploreList is a component of Explore
 *
 * @param {String} userId is the id of the active user
 * @param {function} toggle for the trade module
 */

const ExploreList = (props) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    get("/api/users").then((userList) => {
      const newUserList = userList.filter((userObj) => userObj._id !== props.userId);
      setAllUsers(newUserList);
    });
  }, []);

  //create sorting function that sorts by distance
  //create sorting function that sorts by newest/oldest items
  //create sorting function that sorts by newest/oldest members
  //create sorting function that sorts by number of items

  //update userSchema to include #active items - can remove users with 0!

  let users = null;
  const hasUsers = allUsers.length !== 0;
  if (hasUsers) {
    users = allUsers.map((userObj) => (
      <ExploreCard
        userId={props.userId}
        key={`User_${userObj._id}`}
        userid={userObj._id}
        name={userObj.name}
        target={userObj.target}
        img_loc={userObj.img_loc}
        toggle={props.toggle}
      />
    ));
  } else {
    users = <div>No other users!</div>;
  }

  return <div>{users}</div>;
};

export default ExploreList;
