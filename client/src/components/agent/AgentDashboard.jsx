import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./AgentViewCarListings.module.css";

const AgentDashboard = () => {
	const navigate = useNavigate();
	const [listingID, setListingID] = useState("");
	const { auth } = useAuth();
	const agentID = auth.userID;
	const [error, setError] = useState("");

	const [listings, setListings] = useState([]);

	const createListing = () => {
		navigate("/agent/create");
	};

	const updateListing = (listingID) => {
		navigate(`/agent/listings/${listingID}`);
	};

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const response = await axios.get("/api/agent/listings", {
					params: {
						agentID: agentID,
					},
				});
				if (response.data.listings) {
					setListings(response.data.listings);
				}
			} catch (err) {
				setError("Error fetching data");
			}
		};
		fetchListings();
	}, []);

	return (
		<div className={styles.pageContainer}>
			<h4>Manage Listings</h4>
			<div className={styles.searchContainer}>
				<button className="createListingButton" onClick={createListing}>
					Create
				</button>
				<div>
					<input
						type="text"
						placeholder="Search by Seller ID"
						autoComplete="off"
					/>
					<button>Search</button>
				</div>
			</div>
			<div className={styles.listingContainer}>
				{listings.map((listing) => (
					<div className={styles.listingCard} key={listing.listingID}>
						<img src="./src/assets/audi.jpg" alt="car image" />
						<div className={styles.listingDetails}>
							<p className={styles.listingPrice}>
								{listing.price}
							</p>
							<p>
								{listing.carMake} {listing.carModel}
							</p>
							<p>Listing ID: {listing.listingID}</p>
							<p>Seller ID: {listing.sellerID}</p>
							<p>Car Plate No: {listing.carPlateNo}</p>
							<p>Status: {listing.status}</p>
							<p>Description:</p>
							<p className={styles.wrap}>
								{listing.desc}
								aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
							</p>
							<button
								onClick={(e) => {
									updateListing(listing.listingID);
								}}
							>
								Edit
							</button>
						</div>
					</div>
				))}
				<div className={styles.listingCard}>
					<img src="./src/assets/audi.jpg" alt="car image" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>12312312</p>
						<p>asdasdasd</p>
						<p>Listing ID: asdasdas</p>
						<p>Seller ID: asdasda</p>
						<p>Car Plate No: asdasd</p>
						<p>Status: asdasdad</p>
						<p>Description:</p>
						<p className={styles.wrap}> </p>
						<button type="button">Edit</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgentDashboard;
