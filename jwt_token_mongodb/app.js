const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("node:path");
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

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
