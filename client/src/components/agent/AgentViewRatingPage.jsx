import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./AgentViewRatingPage.module.css";

const AgentViewRatingPage = () => {
	const { auth } = useAuth();
	const agentID = auth.userID;
	const [ratingsReviews, setRatingsReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const viewRatingsAndReviews = async (agentID) => {
			try {
				const response = await axios.get("/api/agent/ratereview", {
					params: { agentID: agentID },
				});
				if (response.status === 200) {
					setRatingsReviews(response.data);
					setLoading(false);
				} else if (response.status === 204) {
					setError("No reviews found!");
					setLoading(false);
				}
			} catch (err) {
				setError("Error fetching data");
				console.log(err);
			}
		};
		viewRatingsAndReviews(agentID);
	}, []);

	console.log(ratingsReviews);

	return (
		<div className={styles.ratingsPageContainer}>
			<h4>Ratings and Reviews</h4>
			{ratingsReviews?.length > 0 ? (
				<div>
					{ratingsReviews?.map((review) => (
						<div
							className={styles.ratingsContainer}
							key={review.userEmail}
						>
							{Array.from({ length: 5 }, (_, index) => (
								<span
									key={index}
									className={
										index < review.rating
											? styles.filledStar
											: styles.emptyStar
									}
								>
									&#9733;
								</span>
							))}
							<p className={styles.emailText}>
								{review.userEmail}
							</p>
							<p className={styles.roleText}>
								{review.userProfile}
							</p>
							<p className={styles.reviewText}>{review.review}</p>
						</div>
					))}
				</div>
			) : (
				<div>No reviews found</div>
			)}
		</div>
	);
};

export default AgentViewRatingPage;
