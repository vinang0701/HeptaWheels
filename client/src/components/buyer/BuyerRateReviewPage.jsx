import React, { useState } from "react";
import styles from "./BuyerRateReviewPage.module.css";

const BuyerRateReviewPage = () => {
	const [rating, setRating] = useState(0);
	const stars = [1, 2, 3, 4, 5];
	const [hoveredRating, setHoveredRating] = useState(0);

	const handleStarClick = (index) => {
		setRating(index);
	};

	const handleStarHover = (index) => {
		setHoveredRating(index);
	};

	const handleStarHoverOut = () => {
		setHoveredRating(0);
	};

	return (
		<div className={styles.buyerRatePageContainer}>
			<h4>Rate and Review</h4>
			<p>Agent ID: </p>
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
			></textarea>
			<button className={styles.submitFeedbackButton}>
				Submit Feedback
			</button>
		</div>
	);
};

export default BuyerRateReviewPage;
