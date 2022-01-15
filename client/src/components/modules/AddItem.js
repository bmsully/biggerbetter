import React, { Component, useState, useEffect } from "react";

import "../../utilities.css";
import "./AddItem.css";

/**
 * AddItems is a component of ItemList
 *
 * @param {String} userId is the owner of the new item
 * @param {String} addNewItem is a function that adds the item to the item list
 */

const AddItem = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //called whenever the user types in name text box
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //called whenever the user types in desc text box
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  // called when the user hits "Submit" in a text input area
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ userid: props.userId, name: name, desc: desc });
    handleClose();
    setName("");
    setDesc("");
  };

  return (
    <div>
      <h3>Add Item</h3>
      <div>
        {show ? (
          <div>
            <input
              type="text"
              placeholder={"Item name"}
              value={name}
              onChange={handleNameChange}
              className=""
            />
            <input
              type="text"
              placeholder={"Item description"}
              value={desc}
              onChange={handleDescChange}
              className=""
            />
            <p>Still need image upload here</p>
            <button type="submit" className="" value="Submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        ) : (
          <button onClick={handleShow}>Add an item!</button>
        )}
      </div>
    </div>
  );
};

export default AddItem;
