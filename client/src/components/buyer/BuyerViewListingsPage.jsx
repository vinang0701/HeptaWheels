import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./BuyerViewListingsPage.module.css";

const BuyerViewListingsPage = () => {
	const { auth } = useAuth();
	const buyerID = auth.userID;
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		const retrieveCarListings = async () => {
			const response = await axios.get("/api/buyer/listings");
			if (response.status === 200 && response.data.length > 0) {
				setListings(response.data);
			} else {
				setError("No listings found...");
			}
			setLoading(false);
		};
		retrieveCarListings();
	}, []);

	const viewDetails = (listingID) => {
		navigate(`/buyer/listings/${listingID}`);
	};

	const handleImageError = (e) => {
		if (!imageError) {
			// Check if the error handler was already triggered
			setImageError(true);
			e.target.src = "/blank.jpg";
		}
	};

	const buyerSearchListing = async (e, query) => {
		e.preventDefault();
		setError("");

		if (query.length > 0) {
			try {
				const data = {
					query: query,
				};
				const response = await axios.post(
					"/api/buyer/listings/search",
					data
				);
				if (
					response.status === 200 &&
					response.data.listings !== null
				) {
					setSearchResult(response.data);
				}
			} catch (err) {
				setError("No listing found!");
			}
		} else {
			setSearchInput("");
			setSearchResult([]);
		}
	};

	if (loading) {
		return (
			<div className={styles.buyerListingsContainer}>
				<h4>Loading...</h4>
			</div>
		);
	}

	return (
		<div className={styles.buyerListingsContainer}>
			<h4>Used Car Listings</h4>

			<div className={styles.searchContainer}>
				<form onSubmit={(e) => buyerSearchListing(e, searchInput)}>
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
				<div className={styles.buyerListingContainer}>
					{searchResult.map((listing) => (
						<div
							className={styles.listingCard}
							key={listing.listingID}
						>
							<img
								src={listing.image}
								alt="Car Image"
								onError={handleImageError}
							/>
							<div className={styles.listingDetails}>
								<p className={styles.listingPrice}>
									${listing.price}
								</p>
								<p className={styles.listingTitle}>
									{listing.carMake} {listing.carModel}
								</p>
								{listing.desc ? (
									<p className={styles.listingDesc}>
										{listing.desc}
									</p>
								) : (
									<p className={styles.listingDesc}>
										No description available...
									</p>
								)}
								<button
									onClick={() =>
										viewDetails(listing.listingID)
									}
								>
									View Listing
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.buyerListingContainer}>
					{listings.map((listing) => (
						<div
							className={styles.listingCard}
							key={listing.listingID}
						>
							<img
								src={listing.image}
								alt="Car Image"
								onError={handleImageError}
							/>
							<div className={styles.listingDetails}>
								<p>Listing ID: {listing.listingID}</p>
								<p className={styles.listingPrice}>
									${listing.price}
								</p>
								<p className={styles.listingTitle}>
									{listing.carMake} {listing.carModel}
								</p>
								{listing.desc ? (
									<p className={styles.listingDesc}>
										{listing.desc}
									</p>
								) : (
									<p className={styles.listingDesc}>
										No description available...
									</p>
								)}
								<button
									onClick={() =>
										viewDetails(listing.listingID)
									}
								>
									View Listing
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BuyerViewListingsPage;
