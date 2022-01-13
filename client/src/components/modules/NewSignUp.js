import React, { useState } from "react";

import "./NewSignUp.css";
import { post } from "../../utilities";

/**
 *
 * Proptypes
 * @param defaultName
 * @param defaultItem
 * @param onSubmit: (function) triggered when this post is submitted
 * NOTE TO BRADY: review and update this?
 */
const NewSignUp = (props) => {
  const [name, setName] = useState(props.defaultName);
  const [item, setItem] = useState(props.defaultItem);

  // called whenever the user types in name text box
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //called whenever the user types in target item text box
  const handleIemChange = (event) => {
    setItem(event.target.value);
  };

  // called when the user hits "Submit" in a text input area
  // will this be one or two functions?
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      item: item,
    };
    props.onSubmit && props.onSubmit(data);
    setName("");
    setItem("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultName}
        value={name}
        onChange={handleNameChange}
        className=""
      />
      <input
        type="text"
        placeholder={props.defaultItem}
        value={item}
        onChange={handleIemChange}
        className=""
      />
      <button type="submit" className="" value="Submit" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default NewSignUp;
