const usersDatabase = require("./user.mongo");
const { PasswordManager } = require("../services/passwordManager");

async function ifUserExists(user) {
	const existingUser = await usersDatabase.findOne({ email: user.email });
	// console.log(existingUser);
	return existingUser;
}

async function addNewUser(user) {
	try {
		const hashedPassword = await PasswordManager.toHash(user.password);
		const newUser = {
			name: user.name,
			email: user.email,
			password: hashedPassword,
		};
		const savedUser = await usersDatabase.create(newUser);
		// console.log(savedUser);
		return savedUser;
	} catch (error) {
		console.log(`Could not save user ${err}`);
	}
}

async function addPostToUser(userId, postId) {
	// console.log(typeof userId);
	try {
		const user = await usersDatabase.findById(userId);
		user.posts.push(postId);
		await user.save();
	} catch (error) {
		console.log(`Could not add post to user ${err}`);
	}
}

module.exports = { ifUserExists, addNewUser, addPostToUser };
