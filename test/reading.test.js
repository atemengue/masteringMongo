const assert = require("assert");
const User = require("../src/models/user");

describe("Reading users out of the database", () => {
  let joe;
  let maria;
  let alex;
  let regis;
  // insert before start searching
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    regis = new User({ name: "Regis" });

    Promise.all([
      alex.save(),
      joe.save(),
      maria.save(),
      regis.save()
    ]).then(() => done());
  });
  // done callback because is async test
  it("finds all users with name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      // console.log(users); // how to write assertion in this place
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
  it("finds a user with a particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });

  // used skip and limit
  it("can skip and limit the result set", done => {
    User.find()
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
