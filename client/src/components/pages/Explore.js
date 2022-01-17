import React, { Component, useEffect, useState } from "react";
import ExploreList from "../modules/ExploreList.js";
import { Link, useNavigate } from "@reach/router";
import TradeModule from "../modules/TradeModule.js";

import "../../utilities.css";
import "./Explore.css";

import { post } from "../../utilities.js";

/**
 * Explore is a page
 *
 * @param {String} userId is the id of the active user
 * @param {String} username is the name of the active user
 */

const Explore = (props) => {
  const [tradingVisible, setTradingVisible] = useState(false);
  const [tradeInfo, setTradeInfo] = useState(null);

  const submitTrade = (userAndItemInfo) => {
    post("/api/trade", { proposer: userAndItemInfo.proposer, approver: userAndItemInfo.approver });
  };

  const toggleTradeModule = (userAndItemInfo) => {
    if (tradingVisible) {
      setTradingVisible(false);
      setTradeInfo(null);
    } else {
      setTradeInfo(userAndItemInfo);
      setTradingVisible(true);
    }
  };

  return (
    <>
      <h1>Explore Page</h1>
      {props.userId ? (
        <>
          <h2>Currently Exploring</h2>
          <form action="#">
            <select name="City">
              <option>Boston</option>
              <option disabled>other cities soon!</option>
            </select>
          </form>
          {tradingVisible && (
            <TradeModule
              userId={props.userId}
              username={props.username}
              tradeInfo={tradeInfo}
              toggle={toggleTradeModule}
              onSubmit={submitTrade}
            />
          )}
          <ExploreList userId={props.userId} toggle={toggleTradeModule} />
        </>
      ) : (
        <>
          <h2> Please log in to see this page </h2>
          <Link to="/login" className="Explore-linkAsButton">
            Get Started
          </Link>
        </>
      )}
    </>
  );
};

export default Explore;
