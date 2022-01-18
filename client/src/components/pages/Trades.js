import React, { Component, useState, useEffect } from "react";
import Pending from "../modules/Pending.js";
import Accepted from "../modules/Accepted.js";
import Complete from "../modules/Complete.js";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Trades.css";

import { get } from "../../utilities.js";

/**
 * Trades is a page that displays the trades the active user is involved in
 *
 * @param {String} userId id of the active user
 */

const Trades = (props) => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [propByTrades, setPropByTrades] = useState([]);
  const [propToTrades, setPropToTrades] = useState([]);
  const [acceptedTrades, setAcceptedTrades] = useState([]);
  const [completeTrades, setCompleteTrades] = useState([]);
  const [declinedTrades, setDeclinedTrades] = useState([]);

  const togglePending = () => setActiveTab("Pending");
  const toggleAccepted = () => setActiveTab("Accepted");
  const toggleComplete = () => setActiveTab("Complete");

  useEffect(() => {
    get("/api/trades", { proposerid: props.userId }).then((tradeObj) => {
      console.log(tradeObj);
      for (const trade of tradeObj) {
        if (!trade.proposer.approved && !trade.approver.approved) {
          //trade existed before, but was declined by approver (proposer.approved set to false)
          setDeclinedTrades([trade].concat(declinedTrades));
        } else if (trade.approver.userid === props.userId && !trade.approver.approved) {
          //active user is approver, and has not yet approved (trade proposed to you)
          setPropToTrades([trade].concat(propToTrades));
        } else if (trade.proposer.userid === props.userId && !trade.approver.approved) {
          //active user is proposed, and other user has not yet approved (trade proposed by you)
          setPropByTrades([trade].concat(propByTrades));
        } else if (trade.proposer.completed && trade.approver.completed) {
          //active user and other user have completed trade
          setCompleteTrades([trade].concat(completeTrades));
        } else {
          //both active user and other user have approved (but either may have indicated completion; this is sorted in <Accepted />)
          setAcceptedTrades([trade].concat(acceptedTrades));
        }
      }
    });
  }, [props.userId]);

  return (
    <div>
      <h1>Trades Page</h1>
      {props.userId ? (
        <>
          <div className="Trades-buttonGroup">
            <button
              className={(activeTab === "Pending" ? "Trades-active" : "") + "Trades-button"}
              onClick={togglePending}
            >
              Pending
            </button>
            <button
              className={(activeTab === "Accepted" ? "Trades-active" : "") + "Trades-button"}
              onClick={toggleAccepted}
            >
              Accepted
            </button>
            <button
              className={(activeTab === "Complete" ? "Trades-active" : "") + "Trades-button"}
              onClick={toggleComplete}
            >
              Complete
            </button>
          </div>
          <div className="Trades-outlet">
            {activeTab === "Pending" ? (
              <Pending propToTrades={propToTrades} propByTrades={propByTrades} />
            ) : activeTab === "Accepted" ? (
              <Accepted userId={props.userId} acceptedTrades={acceptedTrades} />
            ) : (
              <Complete completeTrades={completeTrades} />
            )}
          </div>
        </>
      ) : (
        <>
          <h2> Please log in to see this page </h2>
          <Link to="/login" className="Explore-linkAsButton">
            Get Started
          </Link>
        </>
      )}
    </div>
  );
};

export default Trades;
