import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
	return (
		<div>
			<div className="heading">Welcome to QS</div>
			<div className="buttons">
				<button>
					<Link to="/signup" className="link">
						Sign Up
					</Link>
				</button>
				<button>
					<Link to="/signin" className="link">
						Sign In
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Welcome;
