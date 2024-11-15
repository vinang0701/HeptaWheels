import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserAccountPage.module.css";

const SuspendUserAccountPage = ({ toggleDeleteVisibility, user }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const navigate = useNavigate();

	const suspendAccount = async (email) => {
		setError("");
		setSuccess("");
		try {
			const response = await axios.put(`/api/users/${email}/suspend`);
			if (response.status === 200 && response.data === true) {
				setSuccess("User account has been suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1500);
				window.location.reload();
			} else {
				setError("User account is already suspended!");
				setTimeout(() => {
					toggleDeleteVisibility();
				}, 1000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.deleteCard}>
			<div className={styles.deleteCardContainer}>
				{success && <span className={styles.success}>{success}</span>}
				{error && <span className={styles.error}>{error}</span>}
				<p>Confirm delete user account?</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={() => suspendAccount(user.email)}>
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

export default SuspendUserAccountPage;
