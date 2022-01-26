import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import strawmillionaire from "../../public/strawmillionaire.png";
import demiskipper from "../../public/demiskipper.png";
import {
  PlusCircle,
  InfoCircle,
  Binoculars,
  PatchQuestion,
  ArrowLeftRight,
  HandThumbsUp,
} from "react-bootstrap-icons";

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
      <div className="Landing-bg-dark">
        <div className="u-headerFont Landing-title">BiggerBetter</div>
        <div className="u-headerFont Landing-subtitle">The 1-for-1 trading platform</div>
      </div>
      <div className="Landing-bg-light u-bodyFont u-textCenter">
        <Container>
          <Col>
            <Row className="my-3">
              <div className="u-headerFont Landing-iconSection1">BiggerBetter is Easy</div>
            </Row>
            <Row className="my-2">
              <div className="u-bodyFont Landing-iconSection2">
                <PlusCircle /> Add items by uploading a photo, providing a name and description{" "}
                <InfoCircle />
              </div>
            </Row>
            <Row className="my-2">
              <div className="u-bodyFont Landing-iconSection3">
                <Binoculars /> Explore other users' items and propose trades <PatchQuestion />
              </div>
            </Row>
            <Row className="my-1">
              <div className="u-bodyFont Landing-iconSection4">
                <ArrowLeftRight /> Trade up for Bigger and Better stuff! <HandThumbsUp />
              </div>
            </Row>
          </Col>
        </Container>
      </div>
      <Container fluid>
        <Row className="Landing-bg-dark-cards u-bodyFont">
          <div className="u-headerFont Landing-inspiration">Inspiration for BiggerBetter</div>
          <Col xs={12} md={4}>
            <Card className="Landing-card u-flexColumn u-flex-alignCenter">
              <Row className="align-items-center">
                <Col className="d-flex justify-content-center">
                  <a href="https://www.tiktok.com/@trademeproject" target="_blank">
                    <img src={demiskipper} className="Landing-img" />
                  </a>
                </Col>
                <Col>
                  <div className="Landing-cardtext">
                    Demi Skipper documented her journey of trading a bobby pin for a house on TikTok{" "}
                    <a href="https://www.tiktok.com/@trademeproject" target="_blank">
                      @trademeproject
                    </a>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="Landing-card u-flexColumn u-flex-justifyCenter">
              <iframe
                className="Landing-iframe"
                src="https://www.youtube.com/embed/8s3bdVxuFBs"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="Landing-cardtext">
                In 2006, Kyle MacDonald traded his way from one red paperclip to a two-story house.
                At TEDxVienna in 2015, Kyle reflected on his journey of successive trades and how by
                asking "what if..." we can cultivate ambition, foster collaboration, and strengthen
                community.
              </div>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="Landing-card u-flexColumn u-flex-alignCenter">
              <Row className="align-items-center">
                <Col className="d-flex justify-content-center">
                  <a href="https://en.wikipedia.org/wiki/Straw_Millionaire" target="_blank">
                    <img src={strawmillionaire} className="Landing-img" />
                  </a>
                </Col>
                <Col>
                  <div className="Landing-cardtext">
                    Learn about the folk tale,{" "}
                    <a href="https://en.wikipedia.org/wiki/Straw_Millionaire" target="_blank">
                      Straw Millionaire
                    </a>
                    , where a peasant trades his way to fortune from a single piece of straw.
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      {userId ? (
        <></>
      ) : (
        <div className="Landing-bg-light u-flex u-flex-alignCenter u-flex-justifyCenter">
          <div className="Landing-card-bottom u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
            <h3 className="u-headerFont Landing-card-bottom-text">Start Trading!</h3>
            <div>
              <Button href="/login" className="Landing-btn">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
