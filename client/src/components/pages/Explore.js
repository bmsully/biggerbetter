import React, { Component, useEffect, useState } from "react";
import ExploreList from "../modules/ExploreList.js";
import TradeModule from "../modules/TradeModule.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./Explore.css";

import { post } from "../../utilities.js";

/**
 * Explore is a page that displays items for the active user to explore
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
      <div className="Explore-bg">
        <Container>
          <Row>
            <Col md={0} lg={2} />
            <Col md={12} lg={8}>
              {props.userId ? (
                <>
                  <div className="u-inlineBlock u-flex Explore-title">
                    <h3 className="u-headerFont">Currently Exploring </h3>
                    <div>
                      <Form.Select className="form-select Explore-dropdown" size="--m" action="#">
                        <option default>Boston/Cambridge</option>
                        <option disabled>other cities soon!</option>
                      </Form.Select>
                    </div>
                  </div>
                  {tradingVisible && (
                    <TradeModule
                      tradingVisible={tradingVisible}
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
                  <div className="Explore-bg u-flex u-flex-justifyCenter u-flex-alignCenter">
                    <div className="Explore-card u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
                      <h3 className="u-headerFont Explore-title-bottom">
                        {" "}
                        Please login to see this page
                      </h3>
                      <div>
                        <Button href="/login">Get Started</Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Col>
            <Col md={0} lg={2} />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Explore;
