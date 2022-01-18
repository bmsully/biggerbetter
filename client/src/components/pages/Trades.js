import React, { Component, useState, useEffect } from "react";
import Pending from "../modules/Pending.js";
import Accepted from "../modules/Accepted.js";
import Complete from "../modules/Complete.js";

import "../../utilities.css";
import "./Trades.css";

// This page will have a fun filtering function to sort into Pending, Accepted, and Complete statuses

const Trades = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const handlePending = () => setActiveTab("Pending");
  const handleAccepted = () => setActiveTab("Accepted");
  const handleComplete = () => setActiveTab("Complete");

  return (
    <div>
      <h1>Trades Page</h1>
      <div className="Trades-buttonGroup">
        <button
          className={(activeTab === "Pending" ? "Trades-active" : "") + "Trades-button"}
          onClick={handlePending}
        >
          Pending
        </button>
        <button
          className={(activeTab === "Accepted" ? "Trades-active" : "") + "Trades-button"}
          onClick={handleAccepted}
        >
          Accepted
        </button>
        <button
          className={(activeTab === "Complete" ? "Trades-active" : "") + "Trades-button"}
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
      <div className="Trades-outlet">
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
