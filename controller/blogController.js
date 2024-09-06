import { blogModel } from "../models/blog.models.js";
import { blogValidationSchema } from "../zodSchema/bolg.shema.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await blogModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Server error while fetching posts");
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await blogModel.findById(id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).send("Server error while fetching the post");
  }
};

// Create new post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  // Validate inputs with Zod schema
  const validation = blogValidationSchema.safeParse({ title, content });

  if (!validation.success) {
    return res.status(400).json({
      msg: "Invalid input data",
      errors: validation.error.errors, // Return detailed validation errors
    });
  }

  try {
    const newPost = await blogModel.create({
      title,
      content,
    });
    res.status(201).json({
      msg: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).send("Server error while creating the post");
  }
};

// Update post by ID
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  // Validate inputs before updating
  const validation = blogValidationSchema.safeParse({ title, content });

  if (!validation.success) {
    return res.status(400).json({
      msg: "Invalid input data",
      errors: validation.error.errors,
    });
  }

  try {
    const updatedPost = await blogModel.findByIdAndUpdate(
      postId,
      { title, content },
      {
        new: true, // Return the updated post
        runValidators: true, // Run Mongoose validators
      }
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send("Server error while updating the post");
  }
};

// Delete post by ID
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await blogModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }

    res.status(200).json({
      msg: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).send("Server error while deleting the post");
  }
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
