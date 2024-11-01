import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUser from "./CreateUser";
import styles from "./ManageUserProfilePage.module.css";

const ManageUserProfilePage = () => {
	const [error, setError] = useState(null);
	const [profiles, setProfiles] = useState([]);
	const navigate = useNavigate();

	// Get all user accounts and populate
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await axios.get("/api/profiles");

				setProfiles(response.data.user_profiles);
				// Set the users data to state
				console.log(profiles);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchProfiles(); // Call the fetch function
	}, []);

	const viewProfile = () => {
		console.log("hi");
	};

	return (
		<div>
			<div className={styles.manageProfileContainer}>
				<h4>Manage Profiles</h4>
				<div>
					<div className={styles.searchContainer}>
						<button className="createProfileButton">
							Add Profile
						</button>
						<div>
							<input type="text" placeholder="Search by email" />
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
										onClick={() => viewProfile()}
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
			</div>
		</div>
	);
};

export default ManageUserProfilePage;
