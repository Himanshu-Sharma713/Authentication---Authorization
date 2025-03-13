const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3002;

app.use(cookieParser());

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "himanshu@example.com" }, "secret");
  res.cookie("token", token);
  res.send("Ḍōṇē");
});

app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
