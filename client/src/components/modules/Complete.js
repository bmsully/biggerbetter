import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Complete.css";

/**
 * Complete is a Component of Trades that displays complete TradeCards
 *
 * @param {Array} completeTrades
 */

const Complete = (props) => {
  let completeTrades = null;
  const hasCompleteTrades = props.completeTrades.length !== 0;
  if (hasCompleteTrades) {
    completeTrades = props.completeTrades.map((tradeObj) => (
      <TradeCard
        key={`trade_${tradeObj._id}`}
        proposer={tradeObj.proposer}
        approver={tradeObj.approver}
      />
    ));
  } else completeTrades = <div>You have not completed any trades</div>;

  return (
    <div>
      <h2 className="u-headerFont">Complete Trades</h2>
      <hr />
      {completeTrades}
    </div>
  );
};

export default Complete;
