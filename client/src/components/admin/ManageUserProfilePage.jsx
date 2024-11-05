import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUserProfilePage from "./CreateUserProfilePage";
import styles from "./ManageUserProfilePage.module.css";

const ManageUserProfilePage = () => {
	const [isFormVisible, setFormVisible] = useState(false);
	const [error, setError] = useState("");
	const [searchProfile, setSearchProfile] = useState("");
	const [searchResult, setSearchResult] = useState({});
	const [profiles, setProfiles] = useState([]);
	const navigate = useNavigate();
	const toggleFormVisibility = (e) => {
		e.preventDefault();
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

	const searchUserProfile = async (e) => {
		e.preventDefault();

		if (searchProfile.length > 0) {
			try {
				const response = await axios.get(
					`api/profiles/${searchProfile}`
				);

				if (response.data.user_profile != null) {
					const profileTemp = [];
					profileTemp.push(response.data.user_profile);
					setError("");
					// setSearchResult(response.data.user_profile);
					setProfiles(profileTemp);
					console.log(profiles);
					setSearchProfile("");
				} else {
					setSearchProfile("");
					setError("User not found!");
				}
			} catch (err) {
				setSearchProfile("");
				setSearchResult({});
				setError("Profile not found!");
				console.log(error);
			}
		} else {
			setError("");
			setSearchProfile("");
			setSearchResult({});
		}
	};

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
							<input
								type="text"
								placeholder="Search by name"
								value={searchProfile}
								onChange={(e) =>
									setSearchProfile(e.target.value)
								}
								autoComplete="off"
							/>
							<button onClick={searchUserProfile}>Search</button>
						</div>
					</div>
				</div>
				{error && <span>{error}</span>}
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
