import React, { Component, useState, useEffect } from "react";

import "../../utilities.js";
import "./EditProfile.css";

//need onSubmit, defaultItem,

const EditProfile = (props) => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(props.defaultItem);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //called whenever the user types in target item text box
  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  // called when the user hits "Submit" in a text input area
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ target: item });
    handleClose();
    setItem("");
  };

  return (
    <div>
      {show ? (
        <div>
          <input
            type="text"
            placeholder={props.defaultItem}
            value={item}
            onChange={handleItemChange}
            className=""
          />
          <p>Still need image upload here</p>
          <button type="submit" className="" value="Submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <button onClick={handleShow}>Edit Profile</button>
      )}
    </div>
  );
};

export default EditProfile;
