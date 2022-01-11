import React, { Component } from "react";
import Pending from "../modules/Pending.js";
import Accepted from "../modules/Accepted.js";
import Complete from "../modules/Complete.js";

import "../../utilities.css";
import "./Trades.css";

// This page will have a fun filtering function to sort into Pending, Accepted, and Complete statuses

// This HTML will have a fun rendering switch for Pending, Accepted, and Complete pages
//  this will also likely need a state and modulo operator (0, 1, 2, 3, %3)

const Trades = () => {
  return (
    <div>
      <h1>Trades Page</h1>
      <Pending />
      <Accepted />
      <Complete />
    </div>
  );
};

export default Trades;
