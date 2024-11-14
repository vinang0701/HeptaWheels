import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserProfilePage.module.css";

const SuspendProfilePage = ({ toggleDeleteVisibility, profile }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const suspendProfile = async () => {
		setError("");
		setSuccess("");
		try {
			const profile_name = profile.profile_name;

			const response = await axios.put(
				`/api/profiles/${profile_name}/suspend`
			);
			if (response.data.suspendSuccessful) {
				setSuccess("Profile has been suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1000);
				window.location.reload();
			}
		} catch (err) {
			setError("Profile is already suspended!");
			setTimeout(() => {
				toggleDeleteVisibility();
			}, 1000);
		}
	};

	return (
		<div className={styles.deleteCard}>
			<div className={styles.deleteCardContainer}>
				{success && <span className={styles.success}>{success}</span>}
				{error && <span className={styles.error}>{error}</span>}
				<p>Confirm delete user profile?</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={suspendProfile}>Yes</button>
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
