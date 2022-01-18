import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Pending.css";

/**
 *
 *
 * @param {Array} propToTrades
 * @param {Array} propByTrades
 * @param {Function} handleApprove
 * @param {Function} handleDecline
 */

const Pending = (props) => {
  let toTrades = null;
  const hasToTrades = props.propToTrades.length !== 0;
  if (hasToTrades) {
    toTrades = props.propToTrades.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          propToYou={true}
        />
        <button onClick={props.handleDecline(tradeObj._id)}>Decline</button>
        <button onClick={props.handleApprove(tradeObj._id)}>Approve</button>
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
        propToYou={false}
      />
    ));
  } else {
    toTrades = <div>There are no trades proposed to you</div>;
  }

  return (
    <div>
      <h2>Pending Trades</h2>
      <h3>Proposed to you</h3>
      <TradeCard />
      <hr />
      <h3>Proposed by you</h3>
      <TradeCard />
    </div>
  );
};

export default Pending;
