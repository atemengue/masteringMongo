/** @format */

const mongoose = require("mongoose");

// another code for connect mongo db tutorial
mongoose.connect("mongodb://localhost/user_test");
mongoose.connection
  .once("open", () => console.log("Goog to go!!"))
  .on("error", error => {
    console.warn("Warning", error);
  });
