import React, { Component, useState, useEffect } from "react";

import "../../utilities.css";
import "./Messager.css";

import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";

/**
 * Messager is a Component of Accepted
 *
 * @param {String} userId id of active user
 * @param {Function} closeMessager callback to close the Messager
 * @param {Object} tradeInfo trade object
 */

const Messager = (props) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [valueValid, setValueValid] = useState(true);

  const loadMessages = (tradeId) => {
    get("/api/messages", { tradeid: tradeId }).then((messageObj) => {
      setMessages(messageObj);
    });
  };

  useEffect(() => {
    loadMessages(props.tradeInfo._id);
  }, [messages]);

  useEffect(() => {
    const addMessages = (messageObj) => {
      if (messageObj.tradeid === props.tradeInfo._id) {
        setMessages(messages.concat([messageObj]));
      }
    };
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, [props.userId]);

  const handleClose = () => {
    setMessages([]);
    setValue("");
    props.closeMessager();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const inputValid = () => {
    const valueLength = value.replace(" ", "").length;
    if (valueLength === 0 || valueLength > 140) {
      setValueValid(false);
      return false;
    } else return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //check input is valid
    if (inputValid()) {
      let query;
      query = {
        tradeid: props.tradeInfo._id,
        userid: props.userId,
        name:
          props.userId === props.tradeInfo.proposer.userid
            ? props.tradeInfo.proposer.name
            : props.tradeInfo.approver.name,
        content: value,
      };
      post("/api/messages", query);
      setValue("");
      setValueValid(true);
    }
  };

  if (!messages) {
    return <div>Loading!</div>;
  } else {
    return (
      <div>
        <h3>
          Messaging{" "}
          {props.userId === props.tradeInfo.proposer.userid
            ? props.tradeInfo.approver.name
            : props.tradeInfo.proposer.name}
        </h3>
        <button onClick={() => handleClose()}>Close</button>
        {messages.map((messageObj) => (
          <div key={messageObj._id}>
            <span>{(messageObj.userid === props.userId ? "You" : `${messageObj.name}`) + ":"}</span>
            <span>{messageObj.content}</span>
            <span>{messageObj.date}</span>
          </div>
        ))}
        <div>
          <span>New Message:</span>
          <input
            type="text"
            placeholder={"New Message"}
            value={value}
            onChange={handleChange}
            className={valueValid ? "Messager-valueInputValid" : "Messager-valueInputInvalid"}
          />
          <button type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export default Messager;
