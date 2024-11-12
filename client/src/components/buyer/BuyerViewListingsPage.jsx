import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./BuyerViewListingsPage.module.css";

const BuyerViewListingsPage = () => {
	const [cars, setCars] = useState([]);
	const { auth } = useAuth();
	const [filteredCars, setFilteredCars] = useState([]);
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");
	const buyerID = auth.userID;
	const [error, setError] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		const retrieveCarListings = async () => {
			const response = await axios.get("/api/buyer/listings");
			if (response.status === 200) {
				setListings(response.data.listings);
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
			setImageError(true); // Set the error state to prevent infinite loop
			e.target.src = "/blank.jpg"; // Provide the fallback image path
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
				<form>
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
			<div className={styles.buyerListingContainer}>
				{listings.map((listing) => (
					<div className={styles.listingCard} key={listing.listingID}>
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
								onClick={() => viewDetails(listing.listingID)}
							>
								View Listing
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BuyerViewListingsPage;
