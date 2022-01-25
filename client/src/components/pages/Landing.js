import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./Landing.css";

/**
 * Landing is a page with general information about BiggerBetter
 *
 * @param {String} userId id of active user
 */

const Landing = ({ userId }) => {
  return (
    <div className="Landing-container">
      <div className="Landing-bg-dark u-headerFont Landing-title">
        <div>
          Bigger<span className="Landing-period">.</span>
        </div>
        <div>
          Better<span className="Landing-period">.</span>
        </div>
      </div>
      <div className="Landing-bg-light u-bodyFont">
        This is what BiggerBetter is: brief overview on how to use.
      </div>
      <Container fluid>
        <Row className="Landing-bg-dark">
          <Col className="Landing-card">Story of Kyle MacDonald (red paper clip guy)</Col>
          <Col className="Landing-card">Wikipedia link to BiggerBetter</Col>
          <Col className="Landing-card">TikTok Girl Account</Col>
        </Row>
      </Container>
      {userId ? (
        <></>
      ) : (
        <div className="Landing-bg-light">
          <div className="Landing-card">
            <h3 className="u-headerFont">Start Trading!</h3>
            <Button href="/login" className="">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
