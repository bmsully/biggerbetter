import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../utilities.css";
import "./ProfileCard.css";

/**
 * ProfileCard is a Component displaying info about a user
 *
 * @param {String} username name of user being displayed
 * @param {String} usertarget is the target item of user being displayed
 * @param {String} userimg_loc url of profile image of user being displayed
 */

const ProfileCard = ({ username, usertarget, userimg_loc }) => {
  const divStyle = {
    backgroundImage: "url(" + (userimg_loc === "default" ? defaultProfilePic : userimg_loc) + ")",
  };

  return (
    <>
      <div className="ProfileCard-container">
        <Container fluid="md">
          <Row>
            {/* <Col xs={4} sm={1}></Col> */}
            <Col xs={12} sm={4}>
              <div style={divStyle} className="ProfileCard-img" alt="User's profile picture" />
            </Col>
            {/* <Col xs={4} sm={1}></Col> */}
            <Col xs={12} sm={8}>
              <div className="ProfileCard-info">
                <h3 className="u-headerFont u-textCenter">{username}</h3>
                <div className="u-textCenter">
                  <h4 className="u-headerFont">
                    Target Item: <span className="u-bodyFont">{usertarget}</span>
                  </h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfileCard;
