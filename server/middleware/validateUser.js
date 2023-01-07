const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
	try {
		// console.log(req.session);
		const token = req.session.jwt;
		// console.log(token);

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const decodedToken = jwt.verify(token, "secretKey");
		// console.log("decoded", decodedToken);
		req.userId = decodedToken.id;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: "Unauthorized" });
	}
}

module.exports = validateUser;
