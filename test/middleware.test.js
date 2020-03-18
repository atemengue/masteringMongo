const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/models/user");
const BlogPost = require("../src/models/BlogPost");
const Comment = require("../src/models/comment");

describe("Middleware", () => {
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

  it("users clean up danling blogposts on remove", done => {
    joe
      .remove()
      .then(() => BlogPost.estimatedDocumentCount())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
