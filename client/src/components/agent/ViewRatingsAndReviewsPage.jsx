import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./ViewRatingsAndReviewsPage.module.css";

const ViewRatingsAndReviewsPage = () => {
	return (
		<div className={styles.ratingsPageContainer}>
			<h4>Ratings and Reviews</h4>
			<div className={styles.ratingsContainer}>
				<span>stars</span>
				<p className={styles.emailText}>jamesdee@gmail.com</p>
				<p className={styles.roleText}>Seller</p>
				<p className={styles.reviewText}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Dolorum aliquid enim sunt id magni architecto, laborum,
					quidem molestiae labore, reprehenderit sit commodi sed
					blanditiis corrupti tempora. Et facere modi inventore
					nesciunt reiciendis dolorum reprehenderit. Hic nihil ea odio
					qui velit, dolore voluptate amet similique consequuntur ab
					inventore tempora dicta consectetur iure earum quisquam
					labore laudantium sunt nulla nam voluptas ullam.
				</p>
			</div>
			<div className={styles.ratingsContainer}>
				<span>stars</span>
				<p className={styles.emailText}>jamesdee@gmail.com</p>
				<p className={styles.roleText}>Seller</p>
				<p className={styles.reviewText}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Dolorum aliquid enim sunt id magni architecto, laborum,
					quidem molestiae labore, reprehenderit sit commodi sed
					blanditiis corrupti tempora. Et facere modi inventore
					nesciunt reiciendis dolorum reprehenderit. Hic nihil ea odio
					qui velit, dolore voluptate amet similique consequuntur ab
					inventore tempora dicta consectetur iure earum quisquam
					labore laudantium sunt nulla nam voluptas ullam.
				</p>
			</div>
			<div className={styles.ratingsContainer}>
				<span>stars</span>
				<p className={styles.emailText}>jamesdee@gmail.com</p>
				<p className={styles.roleText}>Seller</p>
				<p className={styles.reviewText}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Dolorum aliquid enim sunt id magni architecto, laborum,
					quidem molestiae labore, reprehenderit sit commodi sed
					blanditiis corrupti tempora. Et facere modi inventore
					nesciunt reiciendis dolorum reprehenderit. Hic nihil ea odio
					qui velit, dolore voluptate amet similique consequuntur ab
					inventore tempora dicta consectetur iure earum quisquam
					labore laudantium sunt nulla nam voluptas ullam.
				</p>
			</div>
		</div>
	);
};

export default ViewRatingsAndReviewsPage;
