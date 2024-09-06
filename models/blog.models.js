import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const blogModel = mongoose.model("blog", blogSchema);
const userModel = mongoose.model("user", userSchema);

export { blogModel, userModel };
