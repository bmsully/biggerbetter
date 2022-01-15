const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  //_id: added automatically
  userid: String, //owner of item
  name: String,
  desc: String,
  img_loc: String,
  active: Boolean,
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
