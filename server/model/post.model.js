const postsDatabase = require("./post.mongo");

async function createPost(post) {
	return await postsDatabase.create(post);
}

async function findPosts(postsById) {
	let finalPosts = [];
	for (let i = 0; i < postsById.length; i++) {
		const post = await postsDatabase.findById(postsById[i]);
		finalPosts.push(post);
	}

	return finalPosts;
}

async function updatePost(postId, post) {
	return await postsDatabase.findByIdAndUpdate(postId, post);
}

module.exports = { createPost, findPosts, updatePost };
