import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  const [valueValid, setValueValid] = useState("");

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
    const valueLength = value.replaceAll(" ", "").length;
    if (valueLength === 0 || value.length > 140) {
      setValueValid("is-invalid");
      return false;
    } else {
      setValueValid("is-valid");
      return true;
    }
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

  return (
    <Modal show={props.tradeInfo !== null} backdrop="static" onHide={handleClose}>
      <Modal.Header className="u-headerFont" closeButton>
        <Modal.Title>
          Messaging{" "}
          {props.userId === props.tradeInfo.proposer.userid
            ? props.tradeInfo.approver.name
            : props.tradeInfo.proposer.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {messages.map((messageObj) => (
          <>
            <div key={messageObj._id} className="Messager-messageContainer">
              <span className="u-headerFont Messager-name">
                {(messageObj.userid === props.userId ? "You" : `${messageObj.name}`) + ": "}
              </span>
              <span className="u-bodyFont Messager-content">{messageObj.content}</span>
            </div>
          </>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <input
          type="text"
          id="valueValidation"
          placeholder={"New Message"}
          value={value}
          onChange={handleChange}
          className={`mb-1 mt-1 form-control ${valueValid}`}
        />
        <div id="valueValidation" className="invalid-feedback">
          Message must be between 1 and 140 characters.
        </div>
        <Button type="submit" value="Submit" onClick={handleSubmit}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Messager;
