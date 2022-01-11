import React, { Component, useState, useEffect } from "react";

import "../../utilities.css";
import "./ItemCard.css";

const ItemCard = () => {
  return (
    <div>
      <h3>Item Card</h3>
      <h4>Item Name</h4>
      <h4>Description:</h4>
      <p>This is a place to describe items!</p>
    </div>
  );
};

export default ItemCard;
