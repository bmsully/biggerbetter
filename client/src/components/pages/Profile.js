import React, { Component, useState, useEffect } from "react";
import ProfileCard from "../modules/ProfileCard.js";
import ItemList from "../modules/ItemList.js";
import EditProfile from "../modules/EditProfile.js";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./Profile.css";

import { get, post } from "../../utilities.js";

/**
 * Profile is a page that displays user information
 * @param {String} userId id of active user
 * @param {String} userid id of users profile page
 */

const Profile = (props) => {
  const [user, setUser] = useState();

  const onSubmit = (newProfileInfo) => {
    const query = { userId: props.userId, newInfo: newProfileInfo };
    post("/api/user", query).then((userObj) => {
      setUser(userObj);
    });
  };

  useEffect(() => {
    get("/api/user", { userid: props.userid }).then((userObj) => setUser(userObj));
  }, []);

  if (!props.userId) {
    return (
      <>
        <div className="Profile-bg u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className="Profile-card u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
            <h3 className="u-headerFont Profile-title-bottom"> Please login to see this page</h3>
            <div>
              <Button href="/login">Get Started</Button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (!user) {
    return <div className="Profile-whitetext u-headerFont"> Loading! </div>;
  } else {
    return (
      <div className="Profile-bg">
        <Container>
          <Row>
            <Col md={0} lg={2} />
            <Col md={12} lg={8}>
              <ProfileCard
                username={user.name}
                usertarget={user.target}
                userimg_loc={user.img_loc}
              />
              {props.userId === props.userid && (
                <EditProfile onSubmit={onSubmit} defaultItem={user.target} />
              )}
              <ItemList userid={props.userid} userId={props.userId} />
            </Col>
            <Col md={0} lg={2} />
          </Row>
        </Container>
      </div>
    );
  }
};

export default Profile;
