import React, { Component, useState, useEffect } from "react";

import "../../utilities.js";
import "./EditProfile.css";

import { get } from "../../utilities.js";

/**
 * EditProfile is a Component of Profile that takes inputs to edit the user's profile
 *
 * @param {Function} onSubmit handles submission to change profile info
 * @param {String} defaultItem current user target item for input placeholder
 */

const EditProfile = (props) => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(props.defaultItem);
  const [file, setFile] = useState(null);
  const [img_loc, setImg_Loc] = useState("");
  const [itemValid, setItemValid] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log("File Changed");
  }, [file]);

  //called whenever the user types in target item text box
  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  //called whenever the user uploads and image
  const handleUpload = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const inputValid = () => {
    if (item.replace(" ", "").length === 0) {
      setItemValid(false);
      return false;
    } else return true;
  };

  // called when the user hits "Submit" in a text input area
  const handleSubmit = (event) => {
    event.preventDefault();
    //check input is valid
    if (inputValid()) {
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
      props.onSubmit && props.onSubmit({ target: item, img_loc: img_loc });
      //close and reset EditProfile
      handleClose();
      setItem("");
      setFile(null);
      setImg_Loc("");
      setItemValid(true);
    }
  };

  return (
    <div>
      {show ? (
        <div>
          {file && (
            <div>
              <img alt="not found" src={URL.createObjectURL(file)} />
              <br />
              <button onClick={() => setFile(null)}>Remove</button>
            </div>
          )}
          <input
            type="text"
            placeholder={props.defaultItem}
            value={item}
            onChange={handleItemChange}
            className={itemValid ? "EditProfile-itemInputValid" : "EditProfile-itemInputInvalid"}
          />
          <input type="file" accept="image/*" onChange={handleUpload} />
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
