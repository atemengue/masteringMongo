const assert = require("assert");
const User = require("../src/models/user");

describe("Updating a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(_ => done());
  });

  function assertName(operation, callback) {
    operation.then(() => {
      User.find({}).then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Regis");
        callback();
      });
    });
  }

  it("instance type using set n save", done => {
    joe.set("name", "Regis"); // in menory persist chain to save method
    assertName(joe.save(), done);
  });

  it("A model instance can update", done => {
    joe.update({ name: "Regis" }).then(async () => {
      // updateOne deprecated
      const user = await User.findOne({ name: "Joe" });
      assert(user === null);
      done();
    });
  });
});
