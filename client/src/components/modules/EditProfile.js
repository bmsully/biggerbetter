import React, { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  const [itemValid, setItemValid] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setItem("");
    setItemValid(true);
    setFile(null);
  };

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
    const itemLen = item.replaceAll(" ", "").length;
    if (itemLen === 0 || item.length >= 140) {
      setItemValid(false);
      return false;
    } else return true;
  };

  // called when the user hits "Submit" in a text input area
  const handleSubmit = (event) => {
    event.preventDefault();
    //check input is valid
    if (inputValid()) {
      if (file) {
        //file uploaded i.e. profile pic being changed from default
        //get secure url from server
        get("/api/s3Url").then((res) => {
          const putRequest = {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: file,
          };
          //post image directly to s3 bucket
          fetch(res.url, putRequest).then(() => {
            const imageUrl = res.url.split("?")[0];
            console.log(imageUrl);
            //submit to MongoDB
            props.onSubmit && props.onSubmit({ target: item, img_loc: imageUrl });
          });
          //close and reset EditProfile
          handleClose();
        });
      } else {
        //no file upload i.e. profile pic is not changing
        //submit to MongoDB
        props.onSubmit && props.onSubmit({ target: item });
        //close and reset EditProfile
        handleClose();
      }
    }
  };

  return (
    <div>
      <div className="u-flexColumn u-flex-alignCenter EditProfile-btn">
        <Button onClick={handleShow}>Edit Profile</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="u-headerFont">
          <Modal.Title>Edit your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {file && (
            <div className="u-flexColumn u-flex-alignCenter">
              <img alt="not found" src={URL.createObjectURL(file)} className="EditProfile-img" />
              <Button
                variant="outline-danger"
                className="EditProfile-removebtn"
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-3 form-control"
          />
          <input
            type="text"
            placeholder={props.defaultItem}
            value={item}
            onChange={handleItemChange}
            id="itemValidation"
            className={"mb-3 form-control " + (itemValid ? "is-valid" : "is-invalid")}
          />
          <div id="itemValidation" className="invalid-feedback">
            Target item must be between 1 and 140 characters.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard Changes
          </Button>
          <Button variant="primary" type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {show ? (
        <div>
          {file && (
            <div>
              <img alt="not found" src={URL.createObjectURL(file)} className="EditProfile-img" />
              <br />
              <Button onClick={() => setFile(null)}>Remove</Button>
            </div>
          )}
          <input
            type="text"
            placeholder={props.defaultItem}
            value={item}
            onChange={handleItemChange}
            className={
              "form-control " +
              (itemValid ? "EditProfile-itemInputValid" : "EditProfile-itemInputInvalid")
            }
          />
          <input type="file" accept="image/*" onChange={handleUpload} className="form-control" />
          <Button type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <div className="u-flexColumn u-flex-alignCenter EditProfile-btn">
          <Button onClick={handleShow}>Edit Profile</Button>
        </div>
      )} */}
    </div>
  );
};

export default EditProfile;
