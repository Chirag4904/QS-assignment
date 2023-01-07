import { useState } from "react";
import axios from "axios";
import "./EditPost.css";
const EditPost = ({ title, description, fetchPosts, id }) => {
	const [newtitle, setNewTitle] = useState(title);
	const [newdescription, setNewDescription] = useState(description);

	const savePost = async () => {
		const res = await axios.patch(
			`http://localhost:5000/posts/${id}`,
			{
				title: newtitle,
				description: newdescription,
			},
			{ withCredentials: true }
		);
		// console.log(res.data);

		await fetchPosts();
	};
	return (
		<div className="main-edit">
			<div className="test">
				<div>
					<label>Edit Title</label>
					<input
						type="text"
						value={newtitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				</div>
				<div>
					<label>Edit Description</label>
					<input
						type="text"
						value={newdescription}
						onChange={(e) => setNewDescription(e.target.value)}
					/>
				</div>

				<button onClick={savePost}>Save</button>
			</div>
		</div>
	);
};

export default EditPost;
