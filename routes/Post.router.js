import express from "express";
import {
  addPostAsync,
  deletePostByIdAsync,
  getAllPostByUserId,
  getAllPostsAsync,
  getSinglePostAsync,
  updatePostByIdAsync,
  reactToPostAsync
} from "../controllers/post.controller.js";
import { requireAuth } from "../middlwares/authMIddlware.js";

const router = express.Router();

// get all posts
 
router.get("/getAllPosts", getAllPostsAsync);

// get all posts by user's id

router.get("/getAllPostsByUserId", requireAuth, getAllPostByUserId)

// get single post by id 

router.get("/getSinglePostById/:id", requireAuth, getSinglePostAsync);

// add post

router.post("/addPost",requireAuth, addPostAsync);

// delete post

router.delete("/deleteSinglePostById/:id",requireAuth, deletePostByIdAsync);

// update post

router.patch("/updateSinglePostById/:id",requireAuth, updatePostByIdAsync);

// like or dislike post by id %

router.put("/reactToPost/:id",requireAuth, reactToPostAsync);

export default router;
