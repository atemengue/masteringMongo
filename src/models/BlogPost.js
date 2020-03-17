const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }] // good for design thinking data
});

const BlogPost = mongoose.model("blogpost", BlogPostSchema);

module.exports = BlogPost;
