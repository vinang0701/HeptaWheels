import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./UpdatePermissionsPage.module.css";

const UpdatePermissionsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { profile_name } = useParams();
	// Retrieve profile from state
	// const { profile } = location.state || {};
	// const [profile_name, setProfileName] = useState(profile.profile_name);
	const [profile, setProfile] = useState({});
	const [permissions, setPermissions] = useState([]);
	const [newProfileName, setNewProfileName] = useState(profile.profile_name);
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const handleGoBack = () => {
		navigate(`/admin/profiles/${profile_name}`); // Go back to the previous page
	};
	console.log(profile_name);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				// var profile_name = decodeURIComponent(profile_name);
				console.log(profile_name);
				const response = await axios.get(
					`api/profiles/${profile_name}`
				);
				const profile_data = response.data.user_profile;
				setProfile(profile_data);
				setStatus(profile_data.status);
				setNewProfileName(profile_data.profile_name);
				// Set permissions if defined, otherwise set it to an empty array
				if (Array.isArray(profile_data.permissions)) {
					setPermissions(profile_data.permissions);
				} else {
					setPermissions([]);
				}

				// console.log(permissions);
				// console.log(profile_data);
				setLoading(false);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
				setLoading(false);
			}
		};

		fetchProfile(); // Call the fetch function
	}, []);

	const handleCheckboxChange = (permission) => {
		setPermissions((prevPermissions) => {
			if (prevPermissions.includes(permission)) {
				// Remove the permission if it is already in the array
				return prevPermissions.filter((p) => p !== permission);
			} else {
				// Add the permission if it is not in the array
				return [...prevPermissions, permission];
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Reset errors first
		setError("");

		const data = {
			profile_name: newProfileName,
			permissions: permissions,
			status: status,
		};

		try {
			// Make a POST request to the API
			const response = await axios.put(
				`/api/profiles/${profile_name}`,
				data
			);

			if (response.data.status === "success") {
				alert("Profile successfully updated!");
				navigate("/admin/profiles");
			} else {
				setError(response.data.message);
			}
		} catch (err) {
			// Handle error
			setError("Profile update unsuccessful!");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className={styles.backButton} onClick={handleGoBack}>
				&lt; Back
			</div>

			<form
				className={styles.userProfilePermCard}
				onSubmit={handleSubmit}
			>
				{error && <p className={styles.error}>{error}</p>}
				<div className={styles.userProfileDetailsContainer}>
					<div className={styles.profileName}>
						<input
							type="text"
							value={newProfileName}
							onChange={(e) => setNewProfileName(e.target.value)}
						/>
					</div>
					{/* Checkbox ticked */}
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="userAdminPages"
							value="User Admin"
							onChange={() => handleCheckboxChange("User Admin")}
							checked={permissions?.includes("User Admin")}
						/>
						<label htmlFor="userAdminPages">User Admin Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="buyerPages"
							value="Buyer"
							onChange={() => handleCheckboxChange("Buyer")}
							checked={permissions?.includes("Buyer")}
						/>
						<label htmlFor="buyerPages">Buyer Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="sellerPages"
							value="Seller"
							onChange={() => handleCheckboxChange("Seller")}
							checked={permissions?.includes("Seller")}
						/>
						<label htmlFor="sellerPages">Seller Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<input
							type="checkbox"
							name="agentPages"
							value="Used Car Agent"
							onChange={() =>
								handleCheckboxChange("Used Car Agent")
							}
							checked={permissions?.includes("Used Car Agent")}
						/>
						<label htmlFor="agentPages">Used Car Agent Pages</label>
					</div>
					<div className={styles.profileDetails}>
						<label htmlFor="status">Status:</label>
						<select
							name="status"
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>
				</div>
				<button className={styles.saveButton}>Save Changes</button>
				<button
					type="button"
					onClick={handleGoBack}
					className={styles.cancelButton}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default UpdatePermissionsPage;
