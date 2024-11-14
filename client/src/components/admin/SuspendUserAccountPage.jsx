import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserAccountPage.module.css";

const SuspendUserAccountPage = ({ toggleDeleteVisibility, user }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const navigate = useNavigate();

	const suspendAccount = async () => {
		setError("");
		setSuccess("");
		try {
			const userEmail = user.email;
			console.log(userEmail);
			const response = await axios.put(`/api/users/${userEmail}/suspend`);
			if (response.data.isSuspended) {
				setSuccess("User account has been suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1000);
				window.location.reload();
			}
		} catch (err) {
			setError("User account is already suspended!");
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
				<p>Confirm delete user account?</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={suspendAccount}>Yes</button>
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

export default SuspendUserAccountPage;
