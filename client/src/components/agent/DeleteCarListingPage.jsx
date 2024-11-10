import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./AgentViewCarListings.module.css";

const DeleteCarListingPage = ({ toggleDeleteVisibility, listingID }) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleDelete = async () => {
		setError("");
		setSuccess("");
		console.log(listingID);

		try {
			const response = await axios.put(
				`/api/agent/listings/${listingID}/delete`
			);
			if (response.data.deleteSuccess) {
				setSuccess("Listing has been suspended!");
				setTimeout(() => {
					toggleDeleteVisibility(listingID);
				}, 2000);
				window.location.reload();
			}
		} catch (err) {
			setError("Listing is already suspended!");
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
				<p>Confirm suspend Listing ID: {listingID}</p>
				<div className={styles.buttonFlexbox}>
					<button onClick={handleDelete}>Yes</button>
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
