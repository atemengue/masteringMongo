const assert = require("assert");
const User = require("../src/models/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", done => {
    // use remove depreciated
    User.deleteOne({ name: "Joe" }).then(async () => {
      const user = await User.findOne({ name: "Joe" });
      assert(user === null);
      done();
    });
  });

  it("class method remove", () => {
    // same to model instance remove
  });

  it("class method findOneAndRemove", done => {
    User.findOneAndDelete({ name: "Joe" }).then(async () => {
      const user = await User.findOne({ name: "Joe" });
      assert(user === null);
      done();
    });
  });

  it("class method findByIdAndRemove", done => {
    User.findByIdAndDelete(joe._id).then(async () => {
      const user = await User.findOne({ name: "Joe" });
      assert(user === null);
      done();
    });
  });
});
