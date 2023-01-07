import React, { useState } from "react";
import axios from "axios";
import EditPost from "./EditPost";
import "./Post.css";

const Post = ({ title, description, id, fetchPosts, userId }) => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const toggler = () => {
		setToggleEdit(!toggleEdit);
	};

	const deletePost = async (id) => {
		const res = await axios.delete(`http://localhost:5000/posts/${id}`, {
			data: { userId: userId },
			withCredentials: true,
		});
		// console.log(res.data);
		await fetchPosts();
	};

	const editPost = () => {
		toggler();
	};
	return (
		<div>
			<div className="card" key={id}>
				<div className="card-body">
					<div className="title">{title}</div>
					<div className="description">{description}</div>
				</div>
				<div className="btns">
					<button onClick={editPost}>Edit</button>

					<button onClick={deletePost}>Delete</button>
				</div>
				<div className="editbox">
					{toggleEdit ? (
						<EditPost
							id={id}
							fetchPosts={fetchPosts}
							title={title}
							description={description}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Post;
