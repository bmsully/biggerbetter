import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";
import Button from "react-bootstrap/Button";

import "../../utilities.css";
import "./ExploreCard.css";

import { get } from "../../utilities.js";

/**
 * ExploreCard is a component of ExploreList
 *
 * @param {String} userId id of the active user
 * @param {String} key key for the ExploreCard
 * @param {String} userid id of the user on the ExploreCard
 * @param {String} name name of the user on the ExploreCard
 * @param {String} target target item of user on the ExploreCard
 * @param {String} img_loc location of the user's profile image
 * @param {function} toggle passes item/user info to tradeModule
 */
const ExploreCard = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    get("/api/items", { userid: props.userid }).then((itemListObj) => setItemList(itemListObj));
  });

  const onClick = () => {
    const userAndItemInfo = {
      user: {
        id: props.userid,
        name: props.name,
        target: props.target,
        img_loc: props.img_loc,
      },
      items: itemList,
    };
    props.toggle(userAndItemInfo);
  };

  let items = null;
  const hasItems = itemList.length !== 0;
  if (hasItems) {
    items = itemList.filter((itemObj) => itemObj.active);
    if (items.length === 0) {
      items = <div>{props.name} does not have any active items :(</div>;
    } else {
      items = items.map((itemObj) => (
        <div key={`UserItem_${itemObj._id}`}>
          <img src={itemObj.img_loc} className="ExploreCard-itemImg" />
          <div>Item name: {itemObj.name}</div>
          <div>Item description: {itemObj.desc}</div>
        </div>
      ));
    }
  } else {
    items = <div> {props.name} does not have any active items</div>;
  }

  return (
    <div>
      <img
        src={props.img_loc === "default" ? defaultProfilePic : props.img_loc}
        className="ExploreCard-profileImg"
      />
      <h3>{props.name}</h3>
      <h4>Target Item: {props.target}</h4>
      <Button variant="outline-primary" onClick={onClick}>
        Trade with this user!
      </Button>
      {items}
    </div>
  );
};

export default ExploreCard;
