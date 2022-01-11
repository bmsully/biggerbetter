import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Pending.css";

const Pending = () => {
  return (
    <div>
      <h2>Pending Trades</h2>
      <p>This is a Pending trade</p>
      <TradeCard />
    </div>
  );
};

export default Pending;
