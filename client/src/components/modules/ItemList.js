import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import AddItem from "./AddItem.js";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./ItemList.css";

/**
 * ItemList is a component inside Profile
 *
 * @param {String} userid is the id for the user who's items we are displaying
 * @param {String} userId is the id for the user who is currently using
 */

const ItemList = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    get("/api/items", { userid: props.userid }).then((userItems) => {
      setItemList(userItems);
    });
  };

  const addNewItem = (itemObj) => {
    const body = {
      userid: itemObj.userid,
      name: itemObj.name,
      desc: itemObj.desc,
      img_loc: itemObj.img_loc,
    };
    post("/api/items", body).then((newItem) => {
      setItemList([newItem].concat(itemList));
    });
  };

  let activeItems = [];
  let inactiveItems = [];
  for (const item of itemList) {
    if (item.active) {
      activeItems = [item, ...activeItems];
    } else {
      inactiveItems = [item, ...inactiveItems];
    }
  }
  if (activeItems.length !== 0) {
    activeItems = activeItems.map((itemObj) => (
      <ItemCard
        userId={props.userId}
        key={`Item_${itemObj._id}`}
        itemid={itemObj._id}
        userid={itemObj.userid}
        name={itemObj.name}
        desc={itemObj.desc}
        img_loc={itemObj.img_loc}
        className="ItemCard-active"
      />
    ));
  } else {
    activeItems = <div>No active items</div>;
  }
  if (inactiveItems.length !== 0) {
    inactiveItems = inactiveItems.map((itemObj) => (
      <ItemCard
        userId={props.userId}
        key={`Item_${itemObj._id}`}
        itemid={itemObj._id}
        userid={itemObj.userid}
        name={itemObj.name}
        desc={itemObj.desc}
        img_loc={itemObj.img_loc}
        className="ItemCard-inactive"
      />
    ));
  } else {
    inactiveItems = <div>No inactive items</div>;
  }

  return (
    <div>
      {props.userId === props.userid &&
        (itemList.length < 5 ? (
          <AddItem userId={props.userId} onSubmit={addNewItem} />
        ) : (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Users limited to 5 total items</Tooltip>}
          >
            <div className="u-flexColumn u-flex-alignCenter ItemList-btn">
              <Button disabled>Add an item!</Button>
            </div>
          </OverlayTrigger>
        ))}
      <hr />
      <h2 className="u-headerFont">Active Items</h2>
      <h3 className="u-bodyFont">
        These items are currently available to be traded and/or in pending trades
      </h3>
      <h3 className="u-bodyFont">They are visible to other users until accepted in a trade</h3>
      {activeItems}
      <hr />
      <h2 className="u-headerFont">Inactive Items</h2>
      <h3 className="u-bodyFont">These items are currently involved in approved trades</h3>
      <h3 className="u-bodyFont">They are invisible to other users until the trade is complete</h3>
      {inactiveItems}
    </div>
  );
};

export default ItemList;
