const mongoose = require("mongoose");
const assert = require("assert");

const User = require("../src/models/user");
const Comment = require("../src/models/comment");
const BlogPost = require("../src/models/BlogPost");

describe("Associations", () => {
  let joe;
  let blogPost;
  let comment;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "Js is Great",
      content: "It is really yet"
    });
    comment = new Comment({ content: "Congrats on great post" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;
    Promise.all([comment.save(), blogPost.save(), joe.save()]).then(() => {
      done();
    });
  });

  it("saves a relation between a user and a blogpost", done => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then(user => {
        assert(user.blogPosts[0].title === "Js is Great");
        done();
      });
  });

  it("saves a full relation grap", done => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "Js is Great");
        console.log(user);
        done();
      });
  });
});
