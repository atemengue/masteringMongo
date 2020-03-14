const assert = require("assert");
const User = require("../src/models/user");

describe("Reading users out of the database", () => {
  let joe;
  // insert before start searching
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  // done callback because is async test
  it("finds all users with name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      // console.log(users); // how to write assertion in this place
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
});
