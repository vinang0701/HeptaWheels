import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./SellerViewCarListingsPage.module.css";
import SellerTrackViewsPage from "./SellerTrackViewsPage";

const SellerViewCarListingsPage = () => {
	const { auth } = useAuth();
	const sellerID = auth.userID;
	const navigate = useNavigate();
	const [listings, setListings] = useState([]);
	const [listingID, setListingID] = useState("");
	const [error, setError] = useState("");
	const [isViewVisible, setViewVisible] = useState(false);
	const [viewsListingID, setViewsListingID] = useState("");

	useEffect(() => {
		const retrieveCarListings = async (sellerID) => {
			try {
				const response = await axios.get("/api/seller/listings", {
					params: {
						sellerID: sellerID,
					},
				});
				if (response.status === 200 && response.data !== "") {
					setListings(response.data);
				}
			} catch (err) {
				setError("Error fetching data");
			}
		};
		retrieveCarListings(sellerID);
	}, []);

	const rateAgentButton = (agentID, listingID) => {
		navigate(`/seller/listings/${listingID}/agent`, {
			state: { agentID },
		});
	};

	const getNumOfViews = (listingID) => {
		setViewVisible(!isViewVisible);
		setViewsListingID(listingID);
	};

	// Handler for image loading error
	const handleImageError = (e) => {
		e.target.src = "./src/assets/blank.jpg"; // Path to the fallback image
	};

	return (
		<div className={styles.sellerPageContainer}>
			<h4>View Car Listings</h4>

			{listings?.length > 0 ? (
				<div className={styles.sellerListingsContainer}>
					{listings?.map((listing) => (
						<div
							className={styles.listingCard}
							key={listing.listingID}
						>
							<img
								src={listing.image}
								alt="car image"
								onError={handleImageError}
							/>
							<div className={styles.listingDetails}>
								<p className={styles.listingPrice}>
									${listing.price}
								</p>
								<p className={styles.listingTitle}>
									{listing.carMake} {listing.carModel}
								</p>
								<p>Listing ID: {listing.listingID}</p>
								<p>
									Agent ID: {listing.agentID}{" "}
									{listing.status === "Sold" && (
										<button
											className={styles.rateButton}
											onClick={() => {
												rateAgentButton(
													listing.agentID,
													listing.listingID
												);
											}}
										>
											Rate
										</button>
									)}
								</p>
								<p>Car Plate No: {listing.carPlateNo}</p>
								<p>Status: {listing.status}</p>
								<p>Description:</p>
								{listing.desc ? (
									<p className={styles.listingDesc}>
										{listing.desc}
									</p>
								) : (
									<p className={styles.listingDesc}>
										No description available...
									</p>
								)}
								<div className={styles.buttonContainer}>
									<button
										onClick={() =>
											getNumOfViews(listing.listingID)
										}
									>
										View Insights
									</button>
									<button>Shortlist Insights</button>
								</div>
							</div>
						</div>
					))}
					{isViewVisible && (
						<div
							className={styles.overlay}
							onClick={getNumOfViews}
						/>
					)}
					{isViewVisible && (
						<SellerTrackViewsPage
							getNumOfViews={getNumOfViews}
							listingID={viewsListingID}
						/>
					)}
				</div>
			) : null}
		</div>
	);
};

export default SellerViewCarListingsPage;
