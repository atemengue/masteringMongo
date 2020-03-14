/** @format */

const mongoose = require("mongoose");

// Hook qui s'execute seulement un fois wrapper mongoConnection by mocha
before(done => {
  // another code for connect mongo db tutorial
  mongoose.connect("mongodb://localhost/user_test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// Hook only avialable on mocha juste pour des tests
beforeEach(done => {
  mongoose.connection.dropCollection("users", () => {
    done();
  });
});
