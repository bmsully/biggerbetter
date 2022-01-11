import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import AddItem from "./AddItem.js";

import "../../utilities.css";
import "./ItemList.css";

const ItemList = () => {
  return (
    <div>
      <h2>Item List</h2>
      {/* Hard Coded Items and add item features */}
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <AddItem />
    </div>
  );
};

export default ItemList;
