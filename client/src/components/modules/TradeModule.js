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
  const [otherSelected, setOtherSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    get("/api/items", { userid: props.userId }).then((items) => setUserItems(items));
    const query = { proposerid: props.userId, approverid: props.tradeInfo.user.id };
    get("/api/trades", query).then((tradeObj) => setTrades(tradeObj));
  }, []);

  const closeTradeModule = () => {
    //set otherSelected to null
    //set userSelected to null
    props.toggle();
  };

  return (
    <>
      <button onClick={closeTradeModule}> close the trade module </button>
      <div> Placeholder text</div>
    </>
  );
};

export default TradeModule;

/**
 * Note on trade module process
 *
 * Opens on user's profile Card and Items
 * Get request to items(userId) and to trades(proposer:userId, approver:userId and vice versa)
 * Each item has select button, user selects one
 * (profile card disappears, other items disappear)
 * User's items appear (user must have items)
 * User then selects one item (their other items disappear)
 * Check if selected trade exists or has been made before
 * Otherwise, confirm button appears (post request)
 */

//TODO:
//Put data into trade module
//Connect ProfileCard and ItemCard (with selectors/buttons)
//Conditional rendering for selection process (see above)
//Fill in api for adding a trade
//Sort function to make sure the trade is legal/valid
//Testing!!

//Trades page:
//Sort into various pages
//Create control for managing trades (approve/deny)
//Create control for completing trades (switch/keep for self)
//Create messaging system (socket)

//Create some initial styling!

//Deploy!
