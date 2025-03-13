const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3002;

app.use(cookieParser());

app.get("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("pololololoo", salt, function (err, hash) {
      console.log(hash);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
