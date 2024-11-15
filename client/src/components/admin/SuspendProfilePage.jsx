import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserProfilePage.module.css";

const SuspendProfilePage = ({ toggleDeleteVisibility, profile_name }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const suspendProfile = async (profile) => {
		setError("");
		setSuccess("");
		try {
			const response = await axios.put(
				`/api/profiles/${profile}/suspend`
			);
			if (response.status === 200 && response.data === true) {
				setSuccess("Profile has been suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1000);
				window.location.reload();
			} else {
				setError("Profile is already suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1000);
			}
		} catch (err) {
			setError("Server Error");
			console.log(err);
		}
	};

	return (
		<div className={styles.deleteCard}>
			<div className={styles.deleteCardContainer}>
				{success && <span className={styles.success}>{success}</span>}
				{error && <span className={styles.error}>{error}</span>}
				<p>Confirm delete user profile?</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={() => suspendProfile(profile_name)}>
						Yes
					</button>
					<button
						className={styles.noButton}
						onClick={toggleDeleteVisibility}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default SuspendProfilePage;
