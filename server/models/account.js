const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  id: String,
  pw: String,
});

module.exports = mongoose.model("Account", accountSchema);
