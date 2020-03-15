const assert = require("assert");
const User = require("../src/models/user");

describe("Updating a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(_ => done());
  });

  it("instance type using set n save", done => {
    joe.set("name", "Regis"); // in menory persist chain to save method
    joe.save().then(() => {
      User.find({}).then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Regis");
        done();
      });
    });
  });
});
