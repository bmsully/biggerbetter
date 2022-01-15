import React, { Component, useState, useEffect } from "react";
import tempItemPic from "../../public/temp-item.png";

import "../../utilities.css";
import "./ItemCard.css";

/**
 * ItemCard is a component of ItemList
 *
 * @param {String} userId is the id of the active user
 * @param {String} itemid is the id of the item
 * @param {String} userid is the id of the user who owns the item
 * @param {String} name is the name of the item
 * @param {String} desc is the description of the item
 */

const ItemCard = (props) => {
  return (
    <div>
      <h3>Item Card</h3>
      <img src={tempItemPic} className="ItemCard-img" />
      <h4>Name: {props.name}</h4>
      <h5>Description: {props.desc}</h5>
    </div>
  );
};

export default ItemCard;
