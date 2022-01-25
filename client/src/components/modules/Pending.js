import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";
import Button from "react-bootstrap/Button";

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
  let toTrades = null;
  const hasToTrades = props.propToTrades.length !== 0;
  if (hasToTrades) {
    toTrades = props.propToTrades.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={true}
        />
        <Button variant="danger" onClick={() => props.decline(tradeObj._id)}>
          Decline
        </Button>
        <Button variant="success" onClick={() => props.approve(tradeObj._id)}>
          Approve
        </Button>
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
        toYou={false}
      />
    ));
  } else {
    byTrades = <div>There are no trades proposed by you</div>;
  }

  return (
    <div>
      <h3 className="u-headerFont Pending-title">Proposed to you</h3>
      {toTrades}
      <hr />
      <h3 className="u-headerFont Pending-title">Proposed by you</h3>
      {byTrades}
    </div>
  );
};

export default Pending;
