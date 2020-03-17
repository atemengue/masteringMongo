const assert = require("assert");
const User = require("../src/models/user");

describe("Virtual types", () => {
  it("postCount returns numbers of posts", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }]
    });

    joe.save().then(() => {
      User.findOne({ name: "Jose" }).then(user => {
        assert(joe.postCount === 1);
        done();
      });
    });
  });
});
