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

router.get("/users", (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
});

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

router.get("/trades", (req, res) => {
  let query;
  if (req.query.approverid) {
    query = {
      $or: [
        { "proposer.userid": req.query.proposerid, "approver.userid": req.query.approverid },
        { "proposer.userid": req.query.approverid, "approver.userid": req.query.proposerid },
      ],
    };
  } else {
    query = {
      $or: [
        { "proposer.userid": req.query.proposerid },
        { "approver.userid": req.query.proposerid },
      ],
    };
  }
  Trade.find(query).then((trades) => res.send(trades));
});

router.post("/trade", (req, res) => {
  const newTrade = new Trade({
    proposer: {
      userid: req.body.proposer.userid,
      name: req.body.proposer.name,
      item: {
        itemid: req.body.proposer.item._id,
        name: req.body.proposer.item.name,
        desc: req.body.proposer.item.desc,
        img_loc: req.body.proposer.item.img_loc,
      },
      approved: true,
      completed: false,
    },
    approver: {
      userid: req.body.approver.userid,
      name: req.body.approver.name,
      item: {
        itemid: req.body.approver.item._id,
        name: req.body.approver.item.name,
        desc: req.body.approver.item.desc,
        img_loc: req.body.approver.item.img_loc,
      },
      approved: false,
      completed: false,
    },
  });
  newTrade.save().then((trade) => res.send(trade));
});

router.post("/approve", (req, res) => {
  //Find approved trade
  Trade.findById(req.body.tradeid).then((trade) => {
    //update approved trade
    trade.approver.approved = true;
    trade.save();
    //set items in approved trade to inactive status
    let itemQuery = {
      $or: [{ _id: trade.proposer.item.itemid }, { _id: trade.approver.item.itemid }],
    };
    Item.find(itemQuery).then((itemList) => {
      for (const itemObj of itemList) {
        itemObj.active = false;
        itemObj.save();
      }
    });
    //update pending trades that have either item in approved trade
    let tradeQuery;
    tradeQuery = {
      //indicates pending trades
      "proposer.approved": true,
      "approver.approved": false,
      "proposer.completed": false,
      "approver.completed": false,
      $or: [
        //all options for current items being involved in other trades
        { "proposer.item.itemid": trade.proposer.item.itemid },
        { "proposer.item.itemid": trade.approver.item.itemid },
        { "approver.item.itemid": trade.proposer.item.itemid },
        { "approver.item.itemid": trade.approver.item.itemid },
      ],
    };
    Trade.find(tradeQuery).then((tradeList) => {
      for (const tradeObj of tradeList) {
        tradeObj.proposer.approved = false;
        tradeObj.save();
      }
    });
    res.send(trade);
  });
});

router.post("/decline", (req, res) => {
  Trade.findById(req.body.tradeid).then((trade) => {
    trade.proposer.approved = false;
    trade.save().then((trade) => res.send(trade));
  });
});

router.get("/messages", (req, res) => {
  Message.find({ tradeid: req.tradeid })
    .sort({ date: "desc" })
    .then((messages) => res.send(messages));
});

// router.get("", (req, res) => {}) // Retrieves data
// router.post("", (req, res) => {}) // Creates data
// router.delete("", (req, res) => {}) // Deletes data

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
