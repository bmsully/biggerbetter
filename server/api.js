/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Trade = require("./models/trade");
const Item = require("./models/item");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/user", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    for ([key, value] of Object.entries(req.body.newInfo)) {
      if (value !== user[key]) {
        user[key] = value;
      }
    }
    user.save().then((user) => {
      res.send(user);
    });
  });
});

router.get("/items", (req, res) => {
  Item.find({ userid: req.query.userid }).then((items) => {
    res.send(items);
  });
});

router.post("/items", (req, res) => {
  const newItem = new Item({
    userid: req.body.userid,
    name: req.body.name,
    desc: req.body.desc,
    img_loc: "url of item pic once enabled",
    active: true,
  });

  newItem.save().then((item) => res.send(item));
});

router.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});
// router.get("", (req, res) => { // Retrieves data

// })

// router.post("", (req, res) => { // Creates data

// })

// router.delete("", (req, res) => { // Deletes data

// })

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
