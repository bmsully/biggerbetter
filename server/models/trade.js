const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  //_id: added automatically
  proposer: {
    userid: String,
    itemid: String,
    approved: Boolean,
    completed: Boolean,
  },
  approver: {
    userid: String,
    itemid: String,
    approved: Boolean,
    completed: Boolean,
  },
});

// compile model from schema
module.exports = mongoose.model("trade", TradeSchema);
