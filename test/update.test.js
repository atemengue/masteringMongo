const assert = require("assert");
const User = require("../src/models/user");

describe("Updating a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe", postCount: 0 });
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
    joe.updateOne({ name: "Regis" }).then(async () => {
      // updateOne deprecated
      const user = await User.findOne({ name: "Joe" });
      assert(user === null);
      done();
    });
  });

  it("A model class can update", () => {});

  it("A model class can updare one record", () => {});

  it("A model class can find and ", () => {});

  it("A user can have their postcount incremented by 1", done => {
    User.updateOne({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        console.log(user);
        assert(user.postCount === 1);
        done();
      });
  });
});
