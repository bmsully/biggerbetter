const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //_id: added automatically
  name: String,
  googleid: String,
  email: String,
  target: String, //user's target item
  stats: {
    join: Date, //Date when user joined
    propto: Number, //Number of proposals made to user
    propby: Number, //Number of proposals made by user
    approved: Number, //Number of proposals approved by user
  },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
