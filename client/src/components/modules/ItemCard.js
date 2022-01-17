import React, { Component, useState, useEffect } from "react";
import tempItemPic from "../../public/temp-item.png";

import "../../utilities.css";
import "./ItemCard.css";

/**
 * ItemCard is a component of ItemList
 *
 * @param {String} userId id of the active user
 * @param {String} itemid id of the item
 * @param {String} userid id of the user who owns the item
 * @param {String} name name of the item
 * @param {String} desc description of the item
 * @param {String} img_loc url of the item image
 */

const ItemCard = (props) => {
  return (
    <div>
      <h3>Item Card</h3>
      <img src={tempItemPic} className="ItemCard-img" />
      <div>{props.img_loc}</div>
      <h4>Name: {props.name}</h4>
      <h5>Description: {props.desc}</h5>
    </div>
  );
};

export default ItemCard;
