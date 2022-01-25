import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./TradeCard.css";

/**
 * TradeCard is a Component of the Trades page that features trades the active user is involved in
 *
 * @param {String} key
 * @param {Object} proposer object representing proposer side of trade
 * @param {Object} approver object representing approver side of trade
 * @param {Boolean} toYou indicates if trade is made to you (for language)
 */

const TradeCard = (props) => {
  return (
    <div className="TradeCard-container">
      <Container>
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center" xs={12} sm={4}>
            {/* <div className="u-headerFont">Proposer</div> */}
            <img className="TradeCard-img" src={props.proposer.item.img_loc} />
          </Col>
          <Col className="d-flex justify-content-center" xs={12} sm={4}>
            <div className="u-bodyText u-textCenter TradeCard-text">
              <Row>
                <div>
                  You recieve {props.toYou ? props.proposer.item.name : props.approver.item.name}
                </div>
              </Row>
              <hr />
              <Row>
                <div>
                  {props.toYou ? props.proposer.name : props.approver.name} recieves{" "}
                  {props.toYou ? props.approver.item.name : props.proposer.item.name}
                </div>
              </Row>
            </div>
          </Col>
          <Col className="d-flex justify-content-center" xs={12} sm={4}>
            {/* <div className="u-headerFont">Approver</div> */}
            <img className="TradeCard-img" src={props.approver.item.img_loc} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TradeCard;
