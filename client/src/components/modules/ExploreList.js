import React, { Component } from "react";
import ExploreCard from "./ExploreCard.js";

import "../../utilities.css";
import "./ExploreList.css";

import { get } from "../../utilities.js";

/**
 * ExploreList is a component of Explore
 *
 * @param {String} userId is the id of the active user
 */

const ExploreList = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    get("/api/users").then((userList) => {
      setAllUsers(
        userList.filter((userObj) => {
          userObj._id !== props.userId;
        })
      );
    });
  }, []);

  //create sorting function that sorts by distance

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
      />
    ));
  } else {
    users = <div>No other users!</div>;
  }

  return <div>{users}</div>;
};

export default ExploreList;
