const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //_id: added automatically
  name: String,
  googleid: String,
  target: String, //user's target item
  img_loc: String, //location of profile image
  stats: {
    join: Date, //Date when user joined
    propto: Number, //Number of proposals made to user
    propby: Number, //Number of proposals made by user
    trades: Number, //Number of trades user has made
  },
  loc: {
    //location for sorting items by distance!
    lat: Number,
    lon: Number,
  },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
