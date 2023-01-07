import React from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";

const App = () => {
	return (
		<Routes>
			<Route path="/" exact element={<Welcome />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/signin" exact element={<Signin />} />
			<Route path="/posts/:id" exact element={<Posts />} />
		</Routes>
	);
};

export default App;
