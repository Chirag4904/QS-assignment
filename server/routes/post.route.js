const express = require("express");
const postRouter = express.Router();
const {
	addPost,
	getPosts,
	deletePost,
	editPost,
} = require("../controllers/post.controller");

postRouter.get("/:id", getPosts);
postRouter.post("/", addPost);
postRouter.patch("/:id", editPost);
postRouter.delete("/:id", deletePost);

module.exports = postRouter;
