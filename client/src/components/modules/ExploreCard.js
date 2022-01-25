import React, { Component, useState, useEffect } from "react";
import defaultProfilePic from "../../public/default-user-image.png";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./ExploreCard.css";

import { get } from "../../utilities.js";

/**
 * ExploreCard is a component of ExploreList
 *
 * @param {String} userId id of the active user
 * @param {String} key key for the ExploreCard
 * @param {String} userid id of the user on the ExploreCard
 * @param {String} name name of the user on the ExploreCard
 * @param {String} target target item of user on the ExploreCard
 * @param {String} img_loc location of the user's profile image
 * @param {function} toggle passes item/user info to tradeModule
 */
const ExploreCard = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    get("/api/items", { userid: props.userid }).then((itemListObj) => setItemList(itemListObj));
  });

  const onClick = () => {
    const userAndItemInfo = {
      user: {
        id: props.userid,
        name: props.name,
        target: props.target,
        img_loc: props.img_loc,
      },
      items: itemList,
    };
    props.toggle(userAndItemInfo);
  };

  let items = null;
  const hasItems = itemList.length !== 0;
  if (hasItems) {
    items = itemList.filter((itemObj) => itemObj.active);
    if (items.length === 0) {
      items = <div>{props.name} does not have any active items :(</div>;
    } else {
      items = items.map((itemObj) => (
        <div key={`UserItem_${itemObj._id}`}>
          <Container>
            <Row>
              <Col>
                <img src={itemObj.img_loc} className="ExploreCard-itemImg" />
              </Col>
              <Col>
                <div className="u-headerFont">
                  Item name: <span className="u-bodyFont">{itemObj.name}</span>
                </div>
              </Col>
              <Col>
                <div className="u-headerFont">
                  Item description: <span className="u-bodyFont">{itemObj.desc}</span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ));
    }
  } else {
    items = <div> {props.name} does not have any active items</div>;
  }

  return (
    <div className="ExploreCard-container">
      <Container>
        <Row className="align-items-center">
          <Col className="justify-center">
            <img
              src={props.img_loc === "default" ? defaultProfilePic : props.img_loc}
              className="ExploreCard-profileImg"
            />
          </Col>
          <Col>
            <div>
              <h3 className="u-headerFont">{props.name}</h3>
              <h4 className="u-headerFont">
                Target Item: <span className="u-bodyFont">{props.target}</span>
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="u-flex u-flex-justifyCenter">
        <Button variant="outline-primary" className="mb-2" onClick={onClick}>
          Trade with this user!
        </Button>
      </div>

      {items}
    </div>
  );
};

export default ExploreCard;
