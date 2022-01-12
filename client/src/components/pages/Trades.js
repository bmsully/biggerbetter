import React, { Component, useState, useEffect } from "react";
import Pending from "../modules/Pending.js";
import Accepted from "../modules/Accepted.js";
import Complete from "../modules/Complete.js";

import "../../utilities.css";
import "./Trades.css";

// This page will have a fun filtering function to sort into Pending, Accepted, and Complete statuses

// This HTML will have a fun rendering switch for Pending, Accepted, and Complete pages
//  this will also likely need a state and modulo operator (0, 1, 2, 3, %3)

const Trades = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const handlePending = () => setActiveTab("Pending");
  const handleAccepted = () => setActiveTab("Accepted");
  const handleComplete = () => setActiveTab("Complete");

  return (
    <div>
      <h1>Trades Page</h1>
      <div>
        <button className={activeTab === "Pending" ? "active" : ""} onClick={handlePending}>
          Pending
        </button>
        <button className={activeTab === "Accepted" ? "active" : ""} onClick={handleAccepted}>
          Accepted
        </button>
        <button
          className={activeTab === "Complete" ? "active" : "" + "u-bold"}
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
      <div className="outlet">
        {activeTab === "Pending" ? (
          <Pending />
        ) : activeTab === "Accepted" ? (
          <Accepted />
        ) : (
          <Complete />
        )}
      </div>
    </div>
  );
};

export default Trades;
