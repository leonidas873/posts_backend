import PostModel from '../models/Post.model.js';
import mongoose from "mongoose";

//  add post

const addPostAsync = async (req, res) => {
  const { title, text, category, likes } = req.body;
  try {
    const post = await PostModel.create({ title, text, category, authorId:req.user.id, likes });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  get all posts

const getAllPostsAsync = async (req, res) => {
  const posts = await PostModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// get posts by user's id

const getAllPostByUserId = async(req,res) => {
  const posts = await PostModel.find({authorId:req.user.id}).sort({createdAt:-1});
  res.status(200).json({posts})
}

// get single post

const getSinglePostAsync = async (req, res) => {
  const { id } = req.params;
  console.log("controller " + req.user.id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// delete post:

const deletePostByIdAsync = async (req, res) => {
  const { id } = req.params;



  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

const updatePostByIdAsync = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findByIdAndUpdate({ _id: id }, { ...req.body });

  const updatedPost = await PostModel.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(updatedPost);
};

// like or dislike post

const reactToPostAsync = async (req,res) => {
  const { id } = req.params;
  
  const post = await PostModel.findById(id);
  console.log(req.user)
  if (!post.likes.includes(req.user.id)){
    await post.updateOne({$push:{likes:req.user.id}})
    res.status(200).json("the postt has been liked")
  } else {
    await post.updateOne({$pull:{likes:req.user.id}})
    res.status(200).json("post has been disliked")
  }

}

export {
  addPostAsync,
  getAllPostsAsync,
  getSinglePostAsync,
  deletePostByIdAsync,
  updatePostByIdAsync,
  getAllPostByUserId,
  reactToPostAsync
};
