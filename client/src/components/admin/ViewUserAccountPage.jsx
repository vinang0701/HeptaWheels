import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserAccountPage.module.css";
import SuspendUserAccountPage from "./SuspendUserAccountPage";

const ViewUserAccountPage = () => {
	const { email } = useParams(); // Retrieve car ID from the URL

	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [error, setError] = useState("");
	const [isDeleteVisible, setDeleteVisible] = useState(false);

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	const handleEditProfile = () => {
		navigate(`/users/${encodeURIComponent(email)}/edit`, {
			state: { user },
		});
	};

	const toggleDeleteVisibility = () => {
		console.log("Hi");
		setDeleteVisible(!isDeleteVisible);
	};

	useEffect(() => {
		const viewUserAccount = async (email) => {
			try {
				const response = await axios.get(`/api/users/${email}`);
				if (response.status === 200 && response.data !== null) {
					const user_data = response.data;
					setUser(user_data);
				}
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		viewUserAccount(email); // Call the fetch function
	}, []);
	console.log(user);

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
				<button onClick={toggleDeleteVisibility}>Delete</button>
			</div>
			{isDeleteVisible && (
				<div
					className={styles.overlay}
					onClick={toggleDeleteVisibility}
				/>
			)}
			{isDeleteVisible && (
				<SuspendUserAccountPage
					toggleDeleteVisibility={toggleDeleteVisibility}
					user={user}
				/>
			)}
		</div>
	);
};

export default ViewUserAccountPage;
