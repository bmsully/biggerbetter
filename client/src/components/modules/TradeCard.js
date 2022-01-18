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
 * @param {Boolean} you "proposer" or "approver" indicates if trade was proposed by or to you (for language reasons)
 */

//You recieve "their object"
//    In exchange,
//"other user" receives "your object"

const TradeCard = (props) => {
  return (
    <>
      <div>
        <div>Proposer</div>
        <div>Approver</div>
      </div>
      <div>
        <img src={tempItemPic} />
        <div>{props.proposer.item.img_loc}</div>
        <div>You recieve {props.approver.item.name}</div>
        <div>
          {props.approver.name} recieves {props.proposer.item.name}
        </div>
        <img src={tempItemPic} />
        <div>{props.approver.item.img_loc}</div>
      </div>
    </>
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
