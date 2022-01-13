import React, { useState } from "react";

import "./NewSignUp.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * NOTE TO BRADY: review and update this?
 */
const NewSignUp = (props) => {
  const [name, setName] = useState("");
  const [item, setItem] = useState("");

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
    props.onSubmit && props.onSubmit(value);
    setValue("");
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
        Submit
      </button>
    </div>
  );
};

export default NewSignUp;

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewStory = (props) => {
  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
const NewMessage = (props) => {
  const sendMessage = (value) => {
    const body = { recipient: props.recipient, content: value };
    post("/api/message", body);
  };

  return <NewPostInput defaultText="New Message" onSubmit={sendMessage} />;
};

export { NewComment, NewStory, NewMessage };
