const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  //_id: added automatically
  proposer: {
    userid: String,
    name: String,
    item: {
      itemid: String,
      name: String,
      desc: String,
      img_loc: String,
    },
    approved: Boolean, //initialized True
    completed: Boolean, //initialized False
  },
  approver: {
    userid: String,
    name: String,
    item: {
      itemid: String,
      name: String,
      desc: String,
      img_loc: String,
    },
    approved: Boolean, //initialized False
    completed: Boolean, //initialized False
  },
});

// compile model from schema
module.exports = mongoose.model("trade", TradeSchema);
