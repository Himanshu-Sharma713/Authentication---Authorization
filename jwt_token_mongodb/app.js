const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("node:path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3003;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username: username,
        email: email,
        password: hash,
        age: age,
      });

      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);

      res.send(createdUser);
    });
  });
});

app.get("/logout", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
