import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Accepted.css";

const Accepted = () => {
  return (
    <div>
      <h2>Accepted Trades</h2>
      <p>This is an Accepted trade</p>
      <TradeCard />
    </div>
  );
};

export default Accepted;
