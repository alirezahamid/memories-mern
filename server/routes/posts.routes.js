import express from "express"
import {
  getPostById,
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.controllers.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getPosts)

router.get("/:id", getPostById)

router.get("/search", getPostsBySearch)

router.post("/", auth, createPost)

router.patch("/:id", auth, updatePost)

router.patch("/:id/likePost", auth, likePost)

router.delete("/:id", auth, deletePost)

export default router
