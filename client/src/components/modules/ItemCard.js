import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "../../utilities.css";
import "./ItemCard.css";

/**
 * ItemCard is a component of ItemList
 *
 * @param {String} userId id of the active user
 * @param {String} itemid id of the item
 * @param {String} userid id of the user who owns the item
 * @param {String} name name of the item
 * @param {String} desc description of the item
 * @param {String} img_loc url of the item image
 */

const ItemCard = (props) => {
  return (
    <div className="ItemCard-container">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <img src={props.img_loc} className="ItemCard-img" />
          </Col>
          <Col className="align-items-center">
            <div>
              <h4 className="u-headerFont">
                Name: <span className="u-bodyFont">{props.name}</span>
              </h4>
              <h5 className="u-headerFont">
                Description: <span className="u-bodyFont">{props.desc}</span>
              </h5>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemCard;
