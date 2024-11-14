import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./CreateUserProfilePage.module.css";

const CreateUserProfilePage = ({ toggleFormVisibility, profiles }) => {
	const [profileName, setProfileName] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef(null);

	// Need a way to check for current role names
	const pNames = [];
	profiles.forEach((pName) => {
		pNames.push(pName.profile_name);
	});

	console.log("profile names: " + pNames);

	// Custom validity check whenever profileName changes
	useEffect(() => {
		if (inputRef.current) {
			// Check if profileName is empty or matches any of the role names
			if (!profileName) {
				inputRef.current.setCustomValidity("Profile name is required.");
			} else if (pNames.includes(profileName)) {
				inputRef.current.setCustomValidity(
					"Profile name cannot match a role name."
				);
			} else {
				inputRef.current.setCustomValidity(""); // Clear validity if valid
			}
		}
	}, [profileName]);

	const createProfileRequest = async (e) => {
		e.preventDefault();
		try {
			// POST Req
			const data = { profile_name: profileName, permissions: [] };
			const response = await axios.post("/api/profiles", data);

			// isCreated is returned

			const isCreated = response.data.isCreated;

			if (isCreated) {
				toggleFormVisibility;
				alert(response.data.message);
				window.location.reload();
			} else {
				setError(
					"User could not be created. Try with a different name."
				);
			}
		} catch (error) {
			setError(error);
			console.log(error);
		}
	};

	return (
		<div className={styles.createUserProfileContainer}>
			<form onSubmit={createProfileRequest}>
				<div className={styles.formHeader}>
					<label htmlFor="profileName">Profile Name</label>
					<button onClick={toggleFormVisibility}>Close</button>
				</div>

				<div className={styles.inputBox}>
					<input
						ref={inputRef} // Attach the ref
						type="text"
						value={profileName}
						onChange={(e) => setProfileName(e.target.value)}
						required
					/>
					<button type="submit">Create</button>
				</div>
			</form>
		</div>
	);
};

export default CreateUserProfilePage;
