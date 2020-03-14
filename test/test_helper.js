/** @format */

const mongoose = require("mongoose");

// another code for connect mongo db tutorial
mongoose.connect("mongodb://localhost/user_test", { useUnifiedTopology: true });
mongoose.connection
  .once("open", () => console.log("Goog to go!!"))
  .on("error", error => {
    console.warn("Warning", error);
  });

// Hook only avialable on mocha juste pour des tests
beforeEach(done => {
  mongoose.connection.dropCollection("users", () => {
    done();
  });
});
