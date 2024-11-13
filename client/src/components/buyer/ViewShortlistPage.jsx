import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./ViewShortlistPage.module.css";

const ViewShortlistPage = () => {
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
		const viewShortlist = async (buyerID) => {
			const response = await axios.get("/api/buyer/wishlist", {
				params: {
					buyerID: buyerID,
				},
			});

			if (response.status === 200) {
				setListings(response.data);
			}
			setLoading(false);
		};
		viewShortlist(buyerID);
	}, []);
	console.log(listings);

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
		<div className={styles.buyerWishlistPageContainer}>
			<div className={styles.buyerWishlistContainer}>
				<h4>Wishlist</h4>
				{listings?.length > 0 ? (
					<div className={styles.wishlistTable}>
						<div className={styles.wishlistTableHeader}>
							<div>S/N</div>
							<div>Listing ID</div>
							<div>Action</div>
						</div>
						{listings?.map((listing, index) => (
							<div
								className={styles.wishlistTableRow}
								key={listing.listingID}
							>
								<div>{index}</div>
								<div key={listing.listingID}>
									{listing.listingID}
								</div>
								<div>
									<button
										onClick={() => {
											viewDetails(listing.listingID);
										}}
									>
										View Listing
									</button>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ViewShortlistPage;
