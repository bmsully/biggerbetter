import React, { Component, useState, useEffect } from "react";
import Pending from "../modules/Pending.js";
import Accepted from "../modules/Accepted.js";
import Complete from "../modules/Complete.js";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "../../utilities.css";
import "./Trades.css";

import { get, post } from "../../utilities.js";

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
  const [failedTrades, setFailedTrades] = useState([]);

  const togglePending = () => setActiveTab("Pending");
  const toggleAccepted = () => setActiveTab("Accepted");
  const toggleComplete = () => setActiveTab("Complete");

  useEffect(() => {
    getAndSortTrades();
  }, [props.userId]);

  const getAndSortTrades = () => {
    get("/api/trades", { proposerid: props.userId }).then((tradeObj) => {
      for (const trade of tradeObj) {
        if (!trade.proposer.approved && !trade.approver.approved) {
          //trade existed before, but was declined by approver, or items traded in different trade (proposer.approved set to false)
          setFailedTrades([trade].concat(failedTrades));
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
  };

  const approveTrade = (tradeid) => {
    alert("You have approved this trade");
    post("/api/approve", { tradeid: tradeid }).then(() => {
      getAndSortTrades();
      location.reload().then(() => toggleAccepted());
    });
  };

  const declineTrade = (tradeid) => {
    alert("You have declined this trade");
    post("/api/decline", { tradeid: tradeid }).then(() => {
      getAndSortTrades();
      location.reload().then(() => togglePending());
    });
  };

  const completeTrade = (tradeid) => {
    alert("You have completed this trade");
    post("/api/complete", { userid: props.userId, tradeid: tradeid }).then(() => {
      getAndSortTrades();
      location.reload().then(() => toggleAccepted());
    });
  };

  return (
    <div>
      <h1>Trades Page</h1>
      {props.userId ? (
        <>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3 u-flex-justifyCenter"
          >
            <Tab eventKey="Pending" title="Pending">
              <Pending
                propToTrades={propToTrades}
                propByTrades={propByTrades}
                approve={approveTrade}
                decline={declineTrade}
              />
            </Tab>
            <Tab eventKey="Accepted" title="Accepted">
              <Accepted
                userId={props.userId}
                acceptedTrades={acceptedTrades}
                complete={completeTrade}
              />
            </Tab>
            <Tab eventKey="Complete" title="Complete">
              <Complete completeTrades={completeTrades} />
            </Tab>
          </Tabs>
        </>
      ) : (
        <>
          <h2 className="u-headerFont"> Please log in to see this content </h2>
          <Button href="/login" className="">
            Get Started
          </Button>
        </>
      )}
    </div>
  );
};

export default Trades;
