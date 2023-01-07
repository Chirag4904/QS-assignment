const { addNewUser, ifUserExists } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { PasswordManager } = require("../services/passwordManager");

async function signInUser(req, res) {
	const user = req.body;
	try {
		//check if user exists or not
		const userExists = await ifUserExists(user);
		if (!userExists) {
			return res.status(400).send({ message: "Invalid credentials" });
		}

		//check if password is correct or not
		const isPasswordCorrect = await PasswordManager.compare(
			userExists.password,
			user.password
		);
		if (!isPasswordCorrect) {
			return res.status(400).send({ message: "Invalid credentials" });
		}

		//Generate token for user
		const token = jwt.sign({ id: userExists._id }, "secretKey");
		req.session = {
			jwt: token,
		};
		console.log("signing in");
		return res.status(200).json(userExists._id);
		// return res.status(201).json({ token: token });
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server is not working properly");
	}
}

async function signUpUser(req, res) {
	const user = req.body;

	//validation
	try {
		if (!user.name || !user.email || !user.password) {
			return res.status(400).send({ message: "All fields required" });
		}

		//checking if the user already exists
		const userExists = await ifUserExists(user);
		if (userExists) {
			return res.status(400).send({ message: "User already exists" });
		}

		//add new user
		const savedUser = await addNewUser(user);

		//Generate token for user
		const token = jwt.sign({ id: savedUser._id }, "secretKey");
		req.session = {
			jwt: token,
		};
		console.log("signing up");
		// return res.status(201).json({ token: token });
		return res.status(201).json(savedUser._id);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Server is not working properly");
	}
}

async function signOutUser(req, res) {
	console.log("signing out");
	req.session = null;
	res.send({});
}

module.exports = { signUpUser, signInUser, signOutUser };
