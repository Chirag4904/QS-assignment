import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Posts.css";
import Post from "./Post";
const Posts = () => {
	const params = useParams();
	const userId = params.id;
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const fetchPosts = async () => {
		const res = await axios.get(`http://localhost:5000/posts/${userId}`, {
			withCredentials: true,
		});
		// console.log(res.data);
		setPosts(res.data);
		// console.log(posts);
	};

	const createPost = async () => {
		try {
			const res = await axios.post(
				`http://localhost:5000/posts`,
				{
					userId,
					title,
					description,
				},
				{
					withCredentials: true,
				}
			);
			setTitle("");
			setDescription("");
			await fetchPosts();
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const signOut = async () => {
		const res = await axios.post(`http://localhost:5000/user/signout`, {
			withCredentials: true,
		});
		navigate("/");
		// console.log(res.data);
	};

	const renderedPosts = posts.map((post) => {
		return (
			<div key={post._id} className="posts">
				<Post
					fetchPosts={fetchPosts}
					title={post.title}
					description={post.description}
					id={post._id}
					userId={userId}
				/>
			</div>
		);
	});

	return (
		<div className="posts-main">
			<div className="signout">
				<button onClick={signOut}>Sign Out</button>
			</div>

			<div className="new-post">
				<div className="fields">
					<input
						type="text"
						value={title}
						placeholder="Title"
						onChange={(e) => setTitle(e.target.value)}
					/>

					<input
						type="text"
						value={description}
						placeholder="Description"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button onClick={createPost}>Create Post</button>
				</div>
			</div>

			<div className="posts">{renderedPosts}</div>
		</div>
	);
};

export default Posts;
