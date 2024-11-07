import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
// import CreateListing from "./CreateListing";
import styles from "./AgentViewCarListings.module.css";

const AgentDashboard = () => {
	const navigate = useNavigate();

	const createListing = () => {
		navigate("/agent/create");
	};
	return (
		<div className={styles.pageContainer}>
			<h4>Manage Listings</h4>
			<button onClick={createListing}>Create</button>
			<div className={styles.listingContainer}>
				<div className={styles.listingCard}>
					<img src="./src/assets/audi.jpg" alt="car image" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100,000</p>
						<p>Audi R8</p>
						<p>Listing ID</p>
						<p>Seller ID</p>
						<p>Car Plate No.</p>
						<p>Status</p>
					</div>
				</div>
				<div className={styles.listingCard}>
					<img src="./src/assets/audi.jpg" alt="car image" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100,000</p>
						<p>Audi R8</p>
						<p>Listing ID</p>
						<p>Seller ID</p>
						<p>Car Plate No.</p>
						<p>Status</p>
					</div>
				</div>
				<div className={styles.listingCard}>
					<img src="./src/assets/car.jpg" alt="car image" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100,000 </p>
						<p>Audi R8</p>
						<p>Listing ID</p>
						<p>Seller ID</p>
						<p>Car Plate No.</p>
						<p>Status</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgentDashboard;
