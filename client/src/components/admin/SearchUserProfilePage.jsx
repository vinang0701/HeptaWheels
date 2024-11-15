import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUserProfilePage from "./CreateUserProfilePage";
import styles from "./SearchUserProfilePage.module.css";

const SearchUserProfilePage = () => {
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

	// Get all user profiles
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await axios.get("/api/profiles");

				// Set the profiles data to state
				setProfiles(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProfiles(); // Call the fetch function
	}, []);

	const searchProfileRequest = async (e) => {
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
					setSearchResult(response.data.user_profile);
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

	if (Object.keys(searchResult).length === 0) {
		return (
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
							<button onClick={searchProfileRequest}>
								Search
							</button>
						</div>
					</div>
				</div>

				{error ? (
					<span className={styles.error}>{error}</span>
				) : (
					<div>Please search for a user profile</div>
				)}

				{isFormVisible && (
					<div
						className={styles.overlay}
						onClick={toggleFormVisibility}
					/>
				)}
				{isFormVisible && (
					<CreateUserProfilePage
						toggleFormVisibility={toggleFormVisibility}
						profiles={profiles}
					/>
				)}
			</div>
		);
	}

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
							<button onClick={searchProfileRequest}>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className={styles.table}>
					<div className={styles.profileTableHeader}>
						<div>Role</div>
						<div>Status</div>
						<div className={styles.lastColumn}>Actions</div>
					</div>
					<div className={styles.profileTableRow}>
						<div>{searchResult.profile_name}</div>
						<div>{searchResult.status}</div>
						<div>
							<button
								className={styles.lastColumn}
								onClick={() =>
									viewProfile(searchResult.profile_name)
								}
							>
								View Profile
							</button>
						</div>
					</div>
				</div>
				{isFormVisible && (
					<div
						className={styles.overlay}
						onClick={toggleFormVisibility}
					/>
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

export default SearchUserProfilePage;
