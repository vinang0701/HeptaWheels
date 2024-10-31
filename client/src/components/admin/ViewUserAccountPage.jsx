import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserAccountPage.module.css";

const ViewUserAccountPage = () => {
	const { email } = useParams(); // Retrieve car ID from the URL
	const navigate = useNavigate();
	const [user, setUser] = useState("");
	const [error, setError] = useState("");

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	const handleEditProfile = () => {
		navigate(`/users/${encodeURIComponent(email)}/edit`, {
			state: { user },
		});
	};
	useEffect(() => {
		const fetchUser = async () => {
			try {
				var userEmail = decodeURIComponent(email);
				console.log(userEmail);
				const response = await axios.get(
					`http://127.0.0.1:8080/api/users/${userEmail}`
				);
				var user_data = response.data.user_data;
				setUser(user_data);
				console.log(user_data);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchUser(); // Call the fetch function
	}, []);

	return (
		<div>
			<p onClick={handleGoBack} className={styles.backButton}>
				&lt; Back
			</p>
			<div className={styles.card}>
				<h4>User Account</h4>
				<div className={styles.userDetailsContainer}>
					<div className={styles.userDetails}>
						<label>User ID</label>
						<div>{user.userID}</div>
					</div>
					<div className={styles.userDetails}>
						<label>Email</label>
						<div>{user.email}</div>
					</div>
					<div className={styles.userDetails}>
						<label>Password</label>
						<div>{user.password}</div>
					</div>
					<div className={styles.userDetails}>
						<label>Role</label>
						<div>{user.role}</div>
					</div>
					<div className={styles.userDetails}>
						<label>Status</label>
						<div>{user.status}</div>
					</div>
				</div>
				<button
					onClick={handleEditProfile}
					className={styles.editButton}
				>
					Edit
				</button>
				<button>Delete</button>
			</div>
		</div>
	);
};

export default ViewUserAccountPage;
