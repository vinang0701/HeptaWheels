import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUserProfilePage from "./CreateUserProfilePage";
import styles from "./ManageUserProfilePage.module.css";

const ManageUserProfilePage = () => {
	const [isFormVisible, setFormVisible] = useState(false);
	const [error, setError] = useState(null);
	const [profiles, setProfiles] = useState([]);
	const navigate = useNavigate();
	const toggleFormVisibility = () => {
		setFormVisible(!isFormVisible);
	};

	// Get all user accounts and populate
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await axios.get("/api/profiles");

				// Set the profiles data to state
				setProfiles(response.data.user_profiles);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchProfiles(); // Call the fetch function
	}, []);

	// View Specified Profile Function
	const viewProfile = (profile_name) => {
		navigate(`/admin/profiles/${encodeURIComponent(profile_name)}`);
	};

	return (
		<div>
			<div className={styles.manageProfileContainer}>
				<h4>Manage Profiles</h4>
				<div>
					<div className={styles.searchContainer}>
						<button
							className="createProfileButton"
							onClick={toggleFormVisibility}
						>
							Add Profile
						</button>
						<div>
							<input type="text" placeholder="Search by name" />
							<button>Search</button>
						</div>
					</div>
				</div>
				{profiles.length > 0 ? (
					<div className={styles.table}>
						<div className={styles.profileTableHeader}>
							<div>Role</div>
							<div>Status</div>
							<div className={styles.lastColumn}>Actions</div>
						</div>
						{profiles.map((profile) => (
							<div
								className={styles.profileTableRow}
								key={profile.profile_name}
							>
								<div>{profile.profile_name}</div>
								<div>{profile.status}</div>
								<div>
									<button
										className={styles.lastColumn}
										onClick={() =>
											viewProfile(profile.profile_name)
										}
									>
										View Profile
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div>No profiles found. Create a new profile!</div>
				)}
				{isFormVisible && (
					<div className="overlay" onClick={toggleFormVisibility} />
				)}
				{isFormVisible && (
					<CreateUserProfilePage
						toggleFormVisibility={toggleFormVisibility}
						profiles={profiles}
					/>
				)}
			</div>
		</div>
	);
};

export default ManageUserProfilePage;
