import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import ProfileCard from "./ProfileCard.js";
import tempItemPic from "../../public/temp-item.png";

import "../../utilities.css";
import "./TradeModule.css";

import { get } from "../../utilities.js";

/**
 * TradeModule is a component that creates new trades
 *
 * @param {String} userId is the id of the active user
 * @param {Object} tradeInfo contains the user and their items being proposed to
 * @param {function} toggle toggles the trade module
 * @param {function} onSubmit posts a trade with selected items
 */
const TradeModule = (props) => {
  return (
    <>
      <button> close the trade module </button>
      <div> Placeholder text</div>
    </>
  );
};

export default TradeModule;
