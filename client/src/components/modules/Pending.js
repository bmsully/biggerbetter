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
        <div className="u-flex u-flex-justifyCenter">
          <Button
            size="lg"
            className="Pending-btn"
            variant="danger"
            onClick={() => props.decline(tradeObj._id)}
          >
            Decline
          </Button>
          <Button
            size="lg"
            className="Pending-btn"
            variant="success"
            onClick={() => props.approve(tradeObj._id)}
          >
            Approve
          </Button>
        </div>
        <hr className="Pending-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else {
    toTrades = (
      <div className="u-bodyFont Pending-notradestext">
        There are no active trades proposed to you
      </div>
    );
  }

  let byTrades = null;
  const hasByTrades = props.propByTrades.length !== 0;
  if (hasByTrades) {
    byTrades = props.propByTrades.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={false}
        />
        <hr className="Pending-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else {
    byTrades = (
      <div className="u-bodyFont Pending-notradestext">You have no active proposed trades</div>
    );
  }

  return (
    <div>
      <h3 className="u-headerFont Pending-title">Proposed to you</h3>
      {toTrades}
      <hr className="Pending-hr" />
      <h3 className="u-headerFont Pending-title">Proposed by you</h3>
      {byTrades}
    </div>
  );
};

export default Pending;
