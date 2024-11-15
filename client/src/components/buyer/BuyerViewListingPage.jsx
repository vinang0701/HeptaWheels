import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./BuyerViewListingPage.module.css";

const BuyerViewListingPage = () => {
	const { listingID } = useParams();
	const { auth } = useAuth();
	const [agentID, setAgentID] = useState("");
	const buyerID = auth.userID;
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");
	const [listing, setListing] = useState({});
	const [listings, setListings] = useState([]);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	const handleGoBack = () => {
		navigate("/buyer/listings"); // Go back to the previous page
	};

	const saveListing = async () => {
		setError("");
		setSuccess("");
		console.log("BuyerID: " + buyerID);
		console.log("Save Listing: " + listingID);
		const data = {
			buyerID: buyerID,
			listingID: listingID,
		};
		try {
			const response = await axios.post("/api/buyer/wishlist", data);
			if (response.status === 200 && response.data === true) {
				setSuccess("Listing has been added to wishlist!");
			} else {
				setError("Listing is already in wishlist.");
			}
		} catch (err) {
			setError("Listing is already in wishlist.");
		}
	};

	const handleImageError = (e) => {
		if (!imageError) {
			// Check if the error handler was already triggered
			setImageError(true); // Set the error state to prevent infinite loop
			e.target.src = "/blank.jpg";
			e.target.className = "imageError";
		}
	};

	useEffect(() => {
		const viewListing = async () => {
			const response = await axios.get(
				`/api/buyer/listings/${listingID}`,
				{
					params: {
						buyerID: buyerID,
					},
				}
			);
			if (response.status === 200) {
				setListing(response.data.listing);
				setAgentID(response.data.listing.agentID);
			}
			setLoading(false);
		};
		viewListing();
	}, []);

	const rateAgentButton = () => {
		navigate(`/buyer/listings/${listingID}/agent`, {
			state: { agentID },
		});
	};

	if (loading) {
		return (
			<div className={styles.buyerListingsContainer}>
				<h4>Loading...</h4>
			</div>
		);
	}

	return (
		<div className={styles.listingPageContainer}>
			<div className="backButton" onClick={handleGoBack}>
				&lt; Back
			</div>
			{error && <div className={styles.error}>{error}</div>}
			{success && <div className={styles.success}>{success}</div>}
			<div className={styles.buyerListingContainer}>
				<div className={styles.imageContainer}>
					<img
						src={listing.image}
						alt="Uploaded"
						onError={handleImageError}
					/>
				</div>
				<div className={styles.listingDetails}>
					<p className={styles.buyerListingTitle}>
						{listing.carMake} {listing.carModel}
					</p>
					<p className={styles.buyerListingPrice}>
						<span>Price:</span> ${listing.price}
					</p>
					<p className={styles.buyerListingPrice}>
						<span>Listing ID:</span> {listing.listingID}
					</p>

					<span className={styles.listingDetailsHeader}>
						Description:
					</span>
					<p>{listing.desc}</p>
					<p className={styles.listingStatus}>
						<span>Status:</span> {listing.status}
					</p>
					<p className={styles.listingAgentID}>
						<span>Agent ID:</span> {listing.agentID}
						<button
							className={styles.rateButton}
							onClick={rateAgentButton}
						>
							Rate
						</button>
					</p>
					<p className={styles.listingStatus}>
						<span>SellerID:</span> {listing.sellerID}
					</p>
					<div className={styles.saveListing} onClick={saveListing}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16px"
							viewBox="0 -960 960 960"
							width="16px"
							fill="undefined"
						>
							<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
						</svg>
						<p className={styles.saveListingText}>Save Listing</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BuyerViewListingPage;
