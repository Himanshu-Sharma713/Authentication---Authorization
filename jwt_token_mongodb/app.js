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

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("<h1>Something is Wrong</h1>");

  console.log(req.body.password, user.password, (err, result) => {
    if (result) res.send("Yes, You can login");
    else res.send("No, You cannot login");
  });
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
