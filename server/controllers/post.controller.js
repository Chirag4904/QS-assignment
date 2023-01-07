const { createPost, findPosts, updatePost } = require("../model/post.model");
const { addPostToUser } = require("../model/user.model");
const usersDatabase = require("../model/user.mongo");

async function addPost(req, res) {
	const { userId, title, description } = req.body;
	if (!title || !description) {
		return res
			.status(400)
			.send({ message: "Title and description are required" });
	}
	const post = {
		title,
		description,
	};
	try {
		const newPost = await createPost(post);
		// console.log(post);
		await addPostToUser(userId, newPost._id);
		return res.status(201).json(newPost);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server is not working properly");
	}
}

async function getPosts(req, res) {
	const userId = req.params.id;
	// console.log("userid", typeof userId);
	try {
		const user = await usersDatabase.findById(userId);
		const postArray = user.posts;
		const posts = await findPosts(postArray);
		// console.log(postArray, "po");

		return res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server is not working properly");
	}
}

async function deletePost(req, res) {
	const postId = req.params.id;
	const userId = req.body.userId;
	console.log(req.body);
	try {
		const user = await usersDatabase.findById(userId);
		console.log(user);
		const postArray = user.posts;
		const index = postArray.indexOf(postId);
		postArray.splice(index, 1);
		await usersDatabase.findByIdAndUpdate(userId, { posts: postArray });
		return res.status(200).send("Post deleted");
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server is not working properly");
	}
}

async function editPost(req, res) {
	const postId = req.params.id;
	const { title, description } = req.body;
	const post = {
		title,
		description,
	};
	try {
		const updatedPost = await updatePost(postId, post);
		return res.status(200).json({ msg: "Post updated" });
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server is not working properly");
	}
}

module.exports = { addPost, getPosts, deletePost, editPost };
