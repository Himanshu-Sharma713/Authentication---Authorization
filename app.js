const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
const PORT = 3002;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "Himanshu");
  res.send("Done");
});

app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("Read Page");
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
