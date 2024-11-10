import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./AgentViewCarListings.module.css";
import DeleteCarListingPage from "./DeleteCarListingPage";

const AgentDashboard = () => {
	const [isDeleteVisible, setDeleteVisible] = useState(false);
	const [deleteListingID, setDeleteListingID] = useState("");
	const navigate = useNavigate();
	const [listingID, setListingID] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const { auth } = useAuth();
	const agentID = auth.userID;
	const [error, setError] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [listings, setListings] = useState([]);

	const createListing = () => {
		navigate("/agent/create");
	};

	const updateListing = (listingID) => {
		navigate(`/agent/listings/${listingID}`);
	};

	const toggleDeleteVisibility = (listingID) => {
		console.log("Hi");
		setDeleteVisible(!isDeleteVisible);
		setDeleteListingID(listingID);
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

	const handleSearch = async (e) => {
		e.preventDefault();
		setError("");

		if (searchInput.length > 0) {
			try {
				const query = {
					query: searchInput,
				};
				const response = await axios.post(
					"/api/agent/listings/search",
					query
				);
				if (
					response.status === 200 &&
					response.data.listings !== null
				) {
					setSearchResult(response.data.listings);
				}
			} catch (err) {
				setError("No listing found!");
			}
		} else {
			setSearchInput("");
			setSearchResult([]);
		}
	};

	return (
		<div className={styles.pageContainer}>
			<h4>Manage Listings</h4>
			<div className={styles.searchContainer}>
				<button className="createListingButton" onClick={createListing}>
					Create
				</button>
				<form onSubmit={handleSearch}>
					<input
						type="text"
						placeholder="Search by ..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						autoComplete="off"
					/>
					<button type="submit" className="cancelButton">
						Search
					</button>
				</form>
			</div>
			{error && <span className="error">{error}</span>}
			{searchResult.length > 0 ? (
				<div className={styles.listingContainer}>
					{searchResult.map((listing) => (
						<div
							className={styles.listingCard}
							key={listing.listingID}
						>
							{typeof listing.image === "string" ? (
								<img src={listing.image} alt="car image" />
							) : (
								<img src="./src/assets/blank.jpg" alt="blank" />
							)}
							<div className={styles.listingDetails}>
								<p className={styles.listingPrice}>
									${listing.price}
								</p>
								<p className={styles.listingTitle}>
									{listing.carMake} {listing.carModel}
								</p>
								<p>Listing ID: {listing.listingID}</p>
								<p>Seller ID: {listing.sellerID}</p>
								<p>Car Plate No: {listing.carPlateNo}</p>
								<p>Status: {listing.status}</p>
								<p>Description:</p>
								<p className={styles.wrap}>{listing.desc}</p>
								<div className={styles.buttonContainer}>
									<button
										className={styles.editButton}
										onClick={(e) => {
											updateListing(listing.listingID);
										}}
									>
										Edit
									</button>
									<button
										onClick={() =>
											toggleDeleteVisibility(
												listing.listingID
											)
										}
										className={styles.suspendButton}
									>
										Suspend
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.listingContainer}>
					{listings.map((listing) => (
						<div
							className={styles.listingCard}
							key={listing.listingID}
						>
							{typeof listing.image === "string" ? (
								<img src={listing.image} alt="car image" />
							) : (
								<img src="./src/assets/blank.jpg" alt="blank" />
							)}
							<div className={styles.listingDetails}>
								<p className={styles.listingPrice}>
									${listing.price}
								</p>
								<p className={styles.listingTitle}>
									{listing.carMake} {listing.carModel}
								</p>
								<p>Listing ID: {listing.listingID}</p>
								<p>Seller ID: {listing.sellerID}</p>
								<p>Car Plate No: {listing.carPlateNo}</p>
								<p>Status: {listing.status}</p>
								<p>Description:</p>
								<p className={styles.wrap}>{listing.desc}</p>
								<div className={styles.buttonContainer}>
									<button
										className={styles.editButton}
										onClick={(e) => {
											updateListing(listing.listingID);
										}}
									>
										Edit
									</button>
									<button
										onClick={() =>
											toggleDeleteVisibility(
												listing.listingID
											)
										}
										className={styles.suspendButton}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{isDeleteVisible && (
				<div
					className={styles.overlay}
					onClick={toggleDeleteVisibility}
				/>
			)}
			{isDeleteVisible && (
				<DeleteCarListingPage
					toggleDeleteVisibility={toggleDeleteVisibility}
					listingID={deleteListingID}
				/>
			)}
		</div>
	);
};

export default AgentDashboard;
