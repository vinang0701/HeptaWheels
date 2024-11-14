import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./AgentViewCarListings.module.css";

const DeleteCarListingPage = ({ toggleDeleteVisibility, listingID }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const deleteListingRequest = async () => {
		setError("");
		setSuccess("");
		console.log(listingID);

		try {
			const response = await axios.put(
				`/api/agent/listings/${listingID}/delete`
			);
			if (response.status === 200) {
				setSuccess("Listing has been deleted!");
				setTimeout(() => {
					toggleDeleteVisibility(listingID);
				}, 2000);
				window.location.reload();
			}
		} catch (err) {
			if (err.response) {
				setError("Listing is already deleted!");
			}
			setTimeout(() => {
				toggleDeleteVisibility(listingID);
			}, 2000);
		}
	};

	return (
		<div className={styles.deleteCard}>
			<div className={styles.deleteCardContainer}>
				{success && <span className={styles.success}>{success}</span>}
				{error && <span className={styles.error}>{error}</span>}
				<p>Confirm delete Listing ID: {listingID}?</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={deleteListingRequest}>Yes</button>
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

export default DeleteCarListingPage;
