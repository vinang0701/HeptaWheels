import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./BuyerRateReviewPage.module.css";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const BuyerRateReviewPage = () => {
	const { listingID } = useParams();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const { agentID } = location.state || {}; // Retrieve `agentID` from the state
	const userEmail = auth?.email;
	const userProfile = auth?.userRole;
	const [rating, setRating] = useState(0);
	const stars = [1, 2, 3, 4, 5];
	const [hoveredRating, setHoveredRating] = useState(0);
	const [review, setReview] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleGoBack = () => {
		navigate(`/buyer/listings/${listingID}`); // Go back to the previous page
	};

	const handleStarClick = (index) => {
		setRating(index);
	};

	const handleStarHover = (index) => {
		setHoveredRating(index);
	};

	const handleStarHoverOut = () => {
		setHoveredRating(0);
	};

	const buyerSubmitFeedback = async (e) => {
		e.preventDefault();
		setError("");
		if (rating === 0) {
			setError("Please give a rating.");
			return;
		}

		if (review.length <= 0) {
			setError("Please write a review.");
			return;
		}

		const data = {
			agentID: agentID,
			userEmail: userEmail,
			userProfile: userProfile,
			rating: rating,
			review: review,
		};

		try {
			const response = await axios.post("/api/buyer/ratereview", data);
			if (response.status === 200) {
				setSuccess("Feedback have been submitted!");
				setTimeout(() => {
					navigate("/buyer/listings");
				}, 2000);
			} else {
				setError("Feedback could not be submitted. Try again later.");
			}
		} catch (err) {
			setError("Feedback could not be submitted.");
		}
	};

	return (
		<div className={styles.buyerRatePageContainer}>
			<div className="backButton" onClick={handleGoBack}>
				&lt; Back
			</div>
			<h4>Rate and Review</h4>
			{error && <p className="error">{error}</p>}
			{success && <p className={styles.success}>{success}</p>}
			<p>Agent ID: {agentID}</p>
			<div>
				{stars.map((index) => (
					<svg
						key={index}
						xmlns="http://www.w3.org/2000/svg"
						height="48px"
						viewBox="0 -960 960 960"
						width="48px"
						fill={
							index <= (hoveredRating || rating)
								? "#75FB4C"
								: "#d3d3d3" // Conditionally color stars
						}
						className={styles.star}
						onMouseEnter={() => handleStarHover(index)}
						onMouseLeave={handleStarHoverOut}
						onClick={() => handleStarClick(index)}
					>
						<path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
					</svg>
				))}
			</div>
			<textarea
				name="review"
				id="review"
				placeholder="Give your feedback!"
				value={review}
				onChange={(e) => setReview(e.target.value)}
				required
			></textarea>
			<button
				className={styles.submitFeedbackButton}
				onClick={buyerSubmitFeedback}
			>
				Submit Feedback
			</button>
		</div>
	);
};

export default BuyerRateReviewPage;
