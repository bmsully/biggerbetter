const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  //_id: added automatically
  tradeid: String, //parent of message
  date: Date, //used to sort order of messages
  name: String, //poster of message - used to bypass a second call to userCollection
  content: String,
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
