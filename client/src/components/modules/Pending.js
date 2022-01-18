import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Pending.css";

/**
 * Pending is a Component of Trades that displays pending TradeCards
 *
 * @param {Array} propToTrades
 * @param {Array} propByTrades
 * @param {Function} approve
 * @param {Function} decline
 */

const Pending = (props) => {
  //   const handleDecline = (tradeid) => {
  //     toTrades.delete(`trade_${tradeid}`); //may not need this
  //     alert("Trade was declined");
  //     props.decline(tradeid);
  //   };

  //   const handleApprove = (tradeid) => {
  //     toTrades.delete(`trade_${tradeid}`); //may not need this
  //     props.approve(tradeid);
  //   };

  let toTrades = null;
  const hasToTrades = props.propToTrades.length !== 0;
  if (hasToTrades) {
    toTrades = props.propToTrades.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          you={"approver"}
        />
        <button onClick={() => props.decline(tradeObj._id)}>Decline</button>
        <button onClick={() => props.approve(tradeObj._id)}>Approve</button>
      </>
    ));
  } else {
    toTrades = <div>There are no trades proposed to you</div>;
  }

  let byTrades = null;
  const hasByTrades = props.propByTrades.length !== 0;
  if (hasByTrades) {
    byTrades = props.propByTrades.map((tradeObj) => (
      <TradeCard
        key={`trade_${tradeObj._id}`}
        proposer={tradeObj.proposer}
        approver={tradeObj.approver}
      />
    ));
  } else {
    byTrades = <div>There are no trades proposed by you</div>;
  }

  return (
    <div>
      <h2>Pending Trades</h2>
      <hr />
      <h3>Proposed to you</h3>
      {toTrades}
      <hr />
      <h3>Proposed by you</h3>
      {byTrades}
    </div>
  );
};

export default Pending;
