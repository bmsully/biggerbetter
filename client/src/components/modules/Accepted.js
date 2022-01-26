import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";
import Messager from "./Messager.js";
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
  }, [props.acceptedTrades]);

  //Accepted Trades (message or complete)
  let accTrades = null;
  if (accepted.length !== 0) {
    accTrades = accepted.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={props.userId === tradeObj.approver.userid}
        />
        <div className="u-flex u-flex-justifyCenter">
          <Button
            size="lg"
            className="Accepted-btn"
            variant="secondary"
            onClick={() => openMessager(tradeObj)}
          >
            Message
          </Button>
          <Button size="lg" className="Accepted-btn" onClick={() => props.complete(tradeObj._id)}>
            Complete Trade
          </Button>
        </div>
        <hr className="Accepted-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else
    accTrades = (
      <div className="u-bodyFont  u-textCenter Accepted-notradestext">
        No trades awaiting completion
      </div>
    );
  //Accepted Trades and Other User Complete (message or complete)
  let accTheyCompTrades = null;
  if (acceptedAndTheyComplete.length !== 0) {
    accTheyCompTrades = acceptedAndTheyComplete.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={props.userId === tradeObj.approver.userid}
        />
        <div className="u-flex u-flex-justifyCenter">
          <Button
            size="lg"
            className="Accepted-btn"
            variant="secondary"
            onClick={() => openMessager(tradeObj)}
          >
            Message
          </Button>
          <Button size="lg" className="Accepted-btn" onClick={() => props.complete(tradeObj._id)}>
            Complete Trade
          </Button>
        </div>
        <hr className="Accepted-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else
    accTheyCompTrades = (
      <div className="u-bodyFont  u-textCenter Accepted-notradestext">
        No trades awaiting your completion
      </div>
    );
  //Accepted Trades and You Complete
  let accYouCompTrades = null;
  if (acceptedAndYouComplete.length !== 0) {
    accYouCompTrades = acceptedAndYouComplete.map((tradeObj) => (
      <>
        <TradeCard
          key={`trade_${tradeObj._id}`}
          proposer={tradeObj.proposer}
          approver={tradeObj.approver}
          toYou={props.userId === tradeObj.approver.userid}
        />
        <div className="u-flex u-flex-justifyCenter">
          <Button
            size="lg"
            className="Accepted-btn"
            variant="secondary"
            onClick={() => openMessager(tradeObj)}
          >
            Message
          </Button>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>You have already completed this trade</Tooltip>}
          >
            <div>
              <Button size="lg" className="Accepted-btn" disabled>
                Complete Trade
              </Button>
            </div>
          </OverlayTrigger>
        </div>
        <hr className="Accepted-tradehr u-flex u-flex-justifyCenter" />
      </>
    ));
  } else
    accYouCompTrades = (
      <div className="u-bodyFont u-textCenter  Accepted-notradestext">
        No trades awaiting other users' completion
      </div>
    );

  return (
    <div>
      {messagerInfo && (
        <Messager userId={props.userId} closeMessager={closeMessager} tradeInfo={messagerInfo} />
      )}
      <h3 className="u-headerFont Accepted-title">Message or Complete Trade</h3>
      <h4 className="u-headerFont Accepted-subtitle">
        Message the other user to coordinate your item handoff!
      </h4>
      {accTrades}
      <hr className="Accepted-hr" />
      <h3 className="u-headerFont Accepted-title">Waiting for You to Complete</h3>
      <h4 className="u-headerFont Accepted-subtitle">
        The other users have indicated these trades are complete.
      </h4>
      {accTheyCompTrades}
      <hr className="Accepted-hr" />
      <h3 className="u-headerFont Accepted-title">Waiting for Other User to Complete</h3>
      <h4 className="u-headerFont Accepted-subtitle">
        You have indicated these trades are complete.
      </h4>
      {accYouCompTrades}
    </div>
  );
};

export default Accepted;
