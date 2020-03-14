const assert = require("assert");
const User = require("../src/models/user");
describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({ name: "Joe" });
    joe.save().then(() => {
      //has joe beem save successfully ?
      assert(!joe.isNew);
      done();
    });
  });
});
