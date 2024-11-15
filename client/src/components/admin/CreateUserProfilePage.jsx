import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./CreateUserProfilePage.module.css";

const CreateUserProfilePage = ({ toggleFormVisibility, profiles }) => {
	const [profileName, setProfileName] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const inputRef = useRef(null);

	// Need a way to check for current role names
	const pNames = [];
	profiles.forEach((pName) => {
		pNames.push(pName.profile_name);
	});

	const createProfileRequest = async (e, name) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (pNames.includes(name)) {
			setError("Profile name is already in use. Please try again!");
			return;
		}

		try {
			// POST Req
			const data = { name: name };
			const response = await axios.post("/api/profiles", data);

			if (response.status === 200 && response.data === true) {
				setSuccess("Profile created successfully!");
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				setError("Profile could not be created. Try again.");
			}
		} catch (error) {
			setError("Profile could not be created. Try again.");
			console.log(error);
		}
	};

	return (
		<div className={styles.createUserProfileContainer}>
			<form onSubmit={(e) => createProfileRequest(e, profileName)}>
				<div className={styles.formHeader}>
					<label htmlFor="profileName">Profile Name</label>
					<button onClick={toggleFormVisibility}>Close</button>
				</div>
				{error && <div className={styles.createError}>{error}</div>}
				{success && (
					<div className={styles.createSuccess}>{success}</div>
				)}
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
