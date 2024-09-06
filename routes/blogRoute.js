import express from "express";
const router = express.Router();

import blogController from "../controller/blogController.js";

router.get("/posts", blogController.getAllPosts);
router.get("/posts/:id", blogController.getPostById);
router.post("/posts", blogController.createPost);
router.put("/posts/:id", blogController.updatePost);
router.delete("/posts/:id", blogController.deletePost);

export default router;
