const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3002;

app.get("/", (req, res) => {
  bcrypt.compare(
    "polololoo",
    "$2b$10$VFf/4AJgyNunm58jL/9vre9TaKepdcF28Am2BiFeL5otiY3SXau/6",
    function (err, result) {
      console.log(result);
    }
  );
});

// hash -

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
