const assert = require("assert");
const User = require("../src/models/user");

describe("Subdocuments", () => {
  it("Can create subdocument", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }]
    });

    joe.save().then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
    });
  });

  it("add inside existing subdocument another document", done => {
    const joe = new User({
      name: "Joe",
      posts: []
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "New Post" });
        return user.save(); // persistant in the database
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("can remove an existing suddocument", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Title" }]
    });
    joe.save(() => {
      User.findOne({ name: "Joe" })
        .then(user => {
          const post = user.posts[0];
          post.remove(); //API depreciated
          return user.save();
        })
        .then(() => User.findOne({ name: "Joe" }))
        .then(user => {
          assert(user.posts.length === 0);
          done();
        });
    });
  });
});
