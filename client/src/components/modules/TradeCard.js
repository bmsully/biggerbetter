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
 * @param {Boolean} toYou indicates if trade is made to you (for language)
 */

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
        <div>You recieve {props.toYou ? props.proposer.item.name : props.approver.item.name}</div>
        <div>
          {props.toYou ? props.proposer.name : props.approver.name} recieves{" "}
          {props.toYou ? props.approver.item.name : props.proposer.item.name}
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
//Test control for completing trades (switch)

//Create some initial styling!

//Update deployment!
