const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");

const validateUser = require("./middleware/validateUser");

const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: false,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use()
app.use("/user", userRouter);

app.use("/posts", validateUser, postRouter);

module.exports = app;
