import React, { Component, useState, useEffect } from "react";
import tempItemPic from "../../public/temp-item.png";

import "../../utilities.css";
import "./TradeCard.css";

/**
 * TradeCard is a Component of the Trades page that features trades the active user is involved in
 *
 * @param {String} key
 * @param {Object} proposer object representing proposer side of trade
 * @param {Object} approver object representing approver side of trade
 * @param {Boolean} propToYou indicates if trade was proposed to you (for language reasons)
 */

//if proposed to you -> "other user" proposes you give "your object"
//                      In exchange, you recieve "their object"
//if proposed by you -> You propose you recieve "their object"
//                      In exchange, "other user" receives "your object"

const TradeCard = (props) => {
  return (
    <div>
      <h3>Trade Card</h3>
      <p>
        This will have both item's photos, both people involved, and both descriptions of the items
      </p>
    </div>
  );
};

export default TradeCard;

//TODO:
//Testing everthing with more users!

//Trades page:
//Flesh out TradeCard
//Sort trades into various pages
//Sort trades in subpages and map into TradeCards (Pending, Accepted(!), Complete)
//Create button control for managing trades (Decline/Approve) with backend updating!
//Create control for completing trades (switch)
//Create messaging system (socket and messaging api)
//  recall the message parent is the trade id

//Look into the difficulty of aws photo hosting for image urls

//Create some initial styling!

//Update deployment!
