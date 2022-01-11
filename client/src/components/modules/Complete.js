import React, { Component, useState, useEffect } from "react";
import TradeCard from "./TradeCard.js";

import "../../utilities.css";
import "./Complete.css";

const Complete = () => {
  return (
    <div>
      <h2>Complete Trades</h2>
      <p>This is a Complete trade</p>
      <TradeCard />
    </div>
  );
};

export default Complete;
