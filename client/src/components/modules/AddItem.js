import React, { Component, useState, useEffect } from "react";

import "../../utilities.css";
import "./AddItem.css";

import { get } from "../../utilities.js";

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
  const [file, setFile] = useState(null);
  const [img_loc, setImg_Loc] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log("File Changed");
  }, [file]);

  //called whenever the user types in name text box
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //called whenever the user types in desc text box
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  //called whenever the user uploads an image
  const handleUpload = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  // called when the user hits "Submit" in a text input area
  const handleSubmit = (event) => {
    event.preventDefault();
    //get secure url from server
    get("/api/s3Url").then((res) => {
      const putRequest = {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      };
      fetch(res.url, putRequest); //post image directly to s3 bucket

      const imageUrl = res.url.split("?")[0];
      console.log(imageUrl);
      setImg_Loc(imageUrl);
    });
    //submit to MongoDB
    props.onSubmit &&
      props.onSubmit({ userid: props.userId, name: name, desc: desc, img_loc: img_loc });
    //close and reset AddItem
    handleClose();
    setName("");
    setDesc("");
    setFile(null);
    setImg_Loc("");
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
            <input type="file" accept="image/*" onChange={handleUpload} />
            {file && (
              <div>
                <img alt="not found" src={URL.createObjectURL(file)} />
                <br />
                <button onClick={() => setFile(null)}>Remove</button>
              </div>
            )}
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
