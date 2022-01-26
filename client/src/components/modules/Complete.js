import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Complete.css";

/**
 * Complete is a Component of Trades that displays complete TradeCards
 *
 * @param {String} userId id of active user
 * @param {Array} completeTrades
 */

const Complete = (props) => {
  let completeTrades = null;
  const hasCompleteTrades = props.completeTrades.length !== 0;
  if (hasCompleteTrades) {
    completeTrades = props.completeTrades.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={props.userId === tradeObj.approver.userid}
        />
        <hr className="Complete-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else
    completeTrades = (
      <div className="u-bodyFont Complete-notradestext">You have no complete trades</div>
    );

  return (
    <div>
      <h2 className="u-headerFont Complete-title">Finished</h2>
      <h3 className="u-headerFont Complete-subtitle">Items in these trades have been swapped</h3>
      {completeTrades}
    </div>
  );
};

export default Complete;
