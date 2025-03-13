const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/authtestapp");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: number,
});

module.exports = mongoose.model("user", userSchema);
