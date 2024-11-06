import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import styles from "./ViewUserProfilePage.module.css";
import axios from "../../api/axios";
import DeleteUserProfilePage from "./DeleteUserProfilePage";

const ViewUserProfilePage = () => {
	// Get param set in App.jsx
	const { profile_name } = useParams();
	const navigate = useNavigate();

	// Profile is an json string
	const [profile, setProfile] = useState({});
	const [permissions, setPermissions] = useState([]);
	const [error, setError] = useState("");
	const [isDeleteVisible, setDeleteVisible] = useState(false);

	// For testing
	const allAllowed = ["User Admin", "Buyer", "Seller", "Used Car Agent"];

	const handleGoBack = () => {
		navigate("/admin/profiles"); // Go back to the previous page
	};

	const handleEditProfile = () => {
		navigate(`/admin/profiles/${encodeURIComponent(profile_name)}/edit`, {
			state: { profile },
		});
	};

	const toggleDeleteVisibility = () => {
		setDeleteVisible(!isDeleteVisible);
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`api/profiles/${profile_name}`
				);
				const profile_data = response.data.user_profile;
				setProfile(profile_data);
				// Set permissions if defined, otherwise set it to an empty array
				if (Array.isArray(profile_data.permissions)) {
					setPermissions(profile_data.permissions);
				} else {
					setPermissions([]);
				}
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchProfile(); // Call the fetch function
	}, []);

	return (
		<div className={styles.pageContainer}>
			<div className={styles.backButton} onClick={handleGoBack}>
				&lt; Back
			</div>
			<div className={styles.userProfilePermCard}>
				<h4>{profile_name}</h4>
				<div className={styles.userProfileDetailsContainer}>
					{/* Checkbox ticked */}
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="userAdminPages"
							checked={permissions?.includes("User Admin")}
							readOnly
						/>
						<label htmlFor="userAdminPages">User Admin Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="buyerPages"
							checked={permissions?.includes("Buyer")}
							readOnly
						/>
						<label htmlFor="buyerPages">Buyer Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="sellerPages"
							checked={permissions?.includes("Seller")}
							readOnly
						/>
						<label htmlFor="sellerPages">Seller Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="agentPages"
							checked={permissions?.includes("Used Car Agent")}
							readOnly
						/>
						<label htmlFor="agentPages">Used Car Agent Pages</label>
					</div>
					<div>Status: {profile.status}</div>
				</div>
				<button
					className={styles.editButton}
					onClick={handleEditProfile}
				>
					Edit
				</button>
				<button
					className={styles.deleteButton}
					onClick={toggleDeleteVisibility}
				>
					Delete
				</button>
			</div>
			{isDeleteVisible && (
				<div
					className={styles.overlay}
					onClick={toggleDeleteVisibility}
				/>
			)}
			{isDeleteVisible && (
				<DeleteUserProfilePage
					toggleDeleteVisibility={toggleDeleteVisibility}
					profile={profile}
				/>
			)}
		</div>
	);
};

export default ViewUserProfilePage;