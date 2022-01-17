import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import AddItem from "./AddItem.js";

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
    get("/api/items", { userid: props.userid }).then((userItems) => {
      setItemList(userItems);
    });
  }, []);

  const addNewItem = (itemObj) => {
    const body = { userid: itemObj.userid, name: itemObj.name, desc: itemObj.desc };
    post("/api/items", body).then((newItem) => {
      setItemList([newItem].concat(itemList));
    });
  };

  let items = null;
  const hasItems = itemList.length !== 0;
  if (hasItems) {
    items = itemList.filter((itemObj) => itemObj.active);
    if (items.length === 0) {
      items = <div>No active items :(</div>;
    } else {
      items = items.map((itemObj) => (
        <ItemCard
          userId={props.userId}
          key={`Item_${itemObj._id}`}
          itemid={itemObj._id}
          userid={itemObj.userid}
          name={itemObj.name}
          desc={itemObj.desc}
          img_loc={itemObj.img_loc}
        />
      ));
    }
  } else {
    items = <div>No items :(</div>;
  }

  return (
    <div>
      <h2>Item List</h2>
      {props.userId === props.userid && <AddItem userId={props.userId} onSubmit={addNewItem} />}
      {items}
    </div>
  );
};

export default ItemList;
