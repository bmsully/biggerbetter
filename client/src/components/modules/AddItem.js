import React, { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  const [nameValid, setNameValid] = useState("");
  const [descValid, setDescValid] = useState("");
  const [fileValid, setFileValid] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setFile(null);
    setNameValid("");
    setDescValid("");
    setFileValid("");
  };

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

  const inputValid = () => {
    const nameLength = name.replaceAll(" ", "").length;
    const descLength = desc.replaceAll(" ", "").length;
    let tempNameValid = true;
    let tempDescValid = true;
    let tempFileValid = true;
    if (nameLength === 0 || name.length > 33) {
      setNameValid("is-invalid");
      tempNameValid = false;
    } else setNameValid("is-valid");
    if (descLength === 0 || descLength > 141) {
      setDescValid("is-invalid");
      tempDescValid = true;
    } else setDescValid("is-valid");
    if (file === null) {
      setFileValid("is-invalid");
      tempFileValid = false;
    } else setFileValid("is-valid");
    return tempNameValid && tempDescValid && tempFileValid;
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
        //post image directly to s3 bucket
        fetch(res.url, putRequest).then(() => {
          const imageUrl = res.url.split("?")[0];
          console.log(imageUrl);
          //submit to MongoDB
          props.onSubmit &&
            props.onSubmit({ userid: props.userId, name: name, desc: desc, img_loc: imageUrl });
        });
        //close and reset AddItem
        handleClose();
      });
    }
  };

  return (
    <div>
      <div className="u-flexColumn u-flex-alignCenter AddItem-btn">
        <Button onClick={handleShow}>Add an item!</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="u-headerFont">
          <Modal.Title>Add an item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {file && (
            <div className="u-flexColumn u-flex-alignCenter">
              <img alt="not found" src={URL.createObjectURL(file)} className="AddItem-img" />
              <Button
                variant="outline-danger"
                className="AddItem-removebtn"
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
            id="fileValidation"
            className={`mb-1 mt-1 form-control ${fileValid}`}
          />
          <div id="mb-2 fileValidation" className="invalid-feedback">
            Please upload a photo of the item.
          </div>
          <input
            type="text"
            placeholder={"Item name"}
            value={name}
            onChange={handleNameChange}
            id="nameValidation"
            className={`mb-1 mt-1 form-control ${nameValid}`}
          />
          <div id="mb-2 nameValidation" className="invalid-feedback">
            Item name must be greater than 1 but no more than 32 characters.
          </div>
          <input
            type="text"
            placeholder={"Item description"}
            value={desc}
            onChange={handleDescChange}
            id="descValidation"
            className={`mb-1 mt-1 form-control ${descValid}`}
          />
          <div id="mb-2 descValidation" className="invalid-feedback">
            Item description must be greater than 1 but no more than 140 characters.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard Item
          </Button>
          <Button variant="primary" type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {show ? (
          <div>
            <input
              type="text"
              placeholder={"Item name"}
              value={name}
              onChange={handleNameChange}
              id="nameValidation"
              className={"mb-3 form-control " + (nameValid ? "is-valid" : "is-invalid")}
            />
            <div id="nameValidation" className="invalid-feedback">
              Item name must be greater than 1 but no more than 32 characters.
            </div>
            <input
              type="text"
              placeholder={"Item description"}
              value={desc}
              onChange={handleDescChange}
              id="descValidation"
              className={"mb-3 form-control " + (descValid ? "is-valid" : "is-invalid")}
            />
            <div id="descValidation" className="invalid-feedback">
              Item description must be greater than 1 but no more than 140 characters.
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              id="fileValidation"
              className={"mb-3 form-control " + (fileValid ? "is-valid" : "is-invalid")}
            />
            <div id="fileValidation" className="invalid-feedback">
              Please upload a photo of the item.
            </div>
            {file && (
              <div>
                <img alt="not found" src={URL.createObjectURL(file)} />
                <Button variant="outline-danger" onClick={() => setFile(null)}>Remove</Button>
              </div>
            )}
            <Button type="submit" className="" value="Submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="u-flexColumn u-flex-alignCenter AddItem-btn">
            <Button onClick={handleShow}>Add an item!</Button>
          </div>
        )} */}
    </div>
  );
};

export default AddItem;
