import React, { Component, useState, useEffect } from "react";

import "../../utilities.css";
import "./Messager.css";

import { get, post } from "../../utilities.js";

/**
 * Messager is a Component of Accepted
 *
 * @param {String} userId id of active user
 * @param {Function} closeMessager callback to close the Messager
 * @param {Object} messagerInfo contains tradeid and recipient of messager
 */

const Messager = (props) => {
  const [messages, setMessages] = useState([]);

  const loadMessages = (tradeId) => {
    get("/api/messages", { tradeid: tradeId }).then((messageObj) => {
      setMessages(messageObj);
    });
  };

  useEffect(() => {
    loadMessages(props.messagerInfo.tradeid);
  });

  return (
    <div>
      <h3>Messaging {props.messagerInfo.recipient}</h3>
      {messages.map((messageObj) => (
        <div>
          <span>{(messageObj.userid === props.userId ? "You" : `${messageObj.name}`) + ":"}</span>
          <span>{messageObj.content}</span>
          <span>{messageObj.date}</span>
        </div>
      ))}
      <div>
        <span>New Message:</span>
        <input type="text" />
        <button type="submit">Send</button>
      </div>
    </div>
  );
};

export default Messager;
