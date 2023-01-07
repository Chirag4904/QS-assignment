import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	async function onSubmit(e) {
		e.preventDefault();
		try {
			const resp = await axios.post(
				"http://localhost:5000/user/signup",
				{
					name,
					email,
					password,
				},
				{ withCredentials: true }
			);
			navigate(`/posts/${resp.data}`);
			setName("");
			setEmail("");
			setPassword("");
		} catch (err) {
			alert(err.response.data.message);
		}
	}

	return (
		<div className="main">
			<div className="container">
				<h3>Sign up</h3>
				<form onSubmit={onSubmit}>
					<div className="box name">
						<input
							type="text"
							value={name}
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="box email">
						<input
							type="email"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="box password">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="submit">Register</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
