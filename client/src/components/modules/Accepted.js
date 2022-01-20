import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";
import Messager from "./Messager.js";

import "../../utilities.css";
import "./Accepted.css";

/**
 * Accepted is a Component of Trades that displays accepted TradeCards
 *
 * @param {String} userId id of active user
 * @param {Array} acceptedTrades
 * @param {Function} complete function to complete the trade
 */

const Accepted = (props) => {
  const [accepted, setAccepted] = useState([]);
  const [acceptedAndYouComplete, setAcceptedAndYouComplete] = useState([]);
  const [acceptedAndTheyComplete, setAcceptedAndTheyComplete] = useState([]);
  const [messagerInfo, setMessagerInfo] = useState(null);

  const openMessager = (info) => {
    setMessagerInfo(info);
  };

  const closeMessager = () => {
    setMessagerInfo(null);
  };

  useEffect(() => {
    for (const trade of props.acceptedTrades) {
      if (!trade.proposer.completed && !trade.approver.completed) {
        //neither have completed
        setAccepted([trade].concat(accepted));
      } else if (
        (props.userId === trade.proposer.userid &&
          trade.proposer.completed &&
          !trade.approver.completed) ||
        (props.userId === trade.approver.userid &&
          trade.approver.completed &&
          !trade.proposer.completed)
      ) {
        //you have completed, they have not
        setAcceptedAndYouComplete([trade].concat(acceptedAndYouComplete));
      } else {
        //they have completed, you have not
        setAcceptedAndTheyComplete([trade].concat(acceptedAndTheyComplete));
      }
    }
  }, []);

  //Accepted Trades (message or complete)
  let accTrades = null;
  if (accepted.length !== 0) {
    accTrades = accepted.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
        />
        <button onClick={() => openMessager(tradeObj)}>Message</button>
        <button onClick={() => props.complete(tradeObj._id)}>Complete Trade</button>
      </>
    ));
  } else accTrades = <></>;
  //Accepted Trades and Other User Complete (message or complete)
  let accTheyCompTrades = null;
  if (acceptedAndTheyComplete.length !== 0) {
    accTheyCompTrades = acceptedAndTheyComplete.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
        />
        <button onClick={() => openMessager(tradeObj)}>Message</button>
        <button onClick={() => props.complete(tradeObj._id)}>Complete Trade</button>
      </>
    ));
  } else accTheyCompTrades = <></>;
  //Accepted Trades and You Complete
  let accYouCompTrades = null;
  if (acceptedAndYouComplete.length !== 0) {
    accYouCompTrades = acceptedAndYouComplete.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
        />
        <button onClick={() => openMessager(tradeObj)}>Message</button>
        <button disabled>Complete Trade</button>
      </>
    ));
  } else accYouCompTrades = <></>;

  if (messagerInfo) {
    return (
      <div>
        <hr />
        <Messager userId={props.userId} closeMessager={closeMessager} tradeInfo={messagerInfo} />
        <hr />
        <h3>Message or Complete Trade</h3>
        <h4>Message the other user to coordinate your item handoff!</h4>
        {accTrades}
        <hr />
        <h3>Waiting for You to Complete Trade</h3>
        <h4>The other user has indicated this trade is complete.</h4>
        <h4></h4>
        {accTheyCompTrades}
        <hr />
        <h3>Waiting for Other User to Complete Trade</h3>
        <h4>You have indicated this trade is complete.</h4>
        <h4></h4>
        {accYouCompTrades}
      </div>
    );
  } else {
  }
  return (
    <div>
      <h2>Accepted Trades</h2>
      <hr />
      <h3>Message or Complete Trade</h3>
      <h4>Message the other user to coordinate your item handoff!</h4>
      {accTrades}
      <hr />
      <h3>Waiting for You to Complete Trade</h3>
      <h4>The other user has indicated this trade is complete.</h4>
      <h4></h4>
      {accTheyCompTrades}
      <hr />
      <h3>Waiting for Other User to Complete Trade</h3>
      <h4>You have indicated this trade is complete.</h4>
      <h4></h4>
      {accYouCompTrades}
    </div>
  );
};

export default Accepted;
