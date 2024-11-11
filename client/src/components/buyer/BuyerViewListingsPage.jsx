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
	const [listingID, setListingID] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const buyerID = auth.userID;
	const [error, setError] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [listings, setListings] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	fetch("https://6707c1878e86a8d9e42cc865.mockapi.io/cars")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setCars(data);
	// 			setFilteredCars(data); // Initially show all cars
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => console.error("Error fetching data:", error));
	// }, []);

	// const handleSearch = (searchCriteria) => {
	// 	const filtered = cars.filter((car) => {
	// 		const matchesMake = car.make
	// 			.toLowerCase()
	// 			.includes(searchCriteria.make.toLowerCase());
	// 		const matchesModel = car.model
	// 			.toLowerCase()
	// 			.includes(searchCriteria.model.toLowerCase());
	// 		const matchesPrice =
	// 			car.price >= searchCriteria.minPrice &&
	// 			car.price <= searchCriteria.maxPrice;
	// 		return matchesMake && matchesModel && matchesPrice;
	// 	});
	// 	setFilteredCars(filtered);
	// };

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

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
				<div className={styles.listingCard}>
					<img src="audi.jpg" alt="audi" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100000</p>
						<p className={styles.listingTitle}>Audi R8</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Eaque, ut maxime quae optio quam veritatis
							rerum sit consectetur aspernatur quo. Doloribus rem
							obcaecati nobis fugiat excepturi autem totam est?
							Repudiandae dignissimos facilis accusantium alias
							nihil error sequi molestias cumque similique
							corporis placeat delectus, voluptas vitae rem
							perferendis, quae unde. At!
						</p>
						<button>View Details</button>
					</div>
				</div>
				<div className={styles.listingCard}>
					<img src="audi.jpg" alt="audi" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100000</p>
						<p className={styles.listingTitle}>Audi R8</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Eaque, ut maxime quae optio quam veritatis
							rerum sit consectetur aspernatur quo. Doloribus rem
							obcaecati nobis fugiat excepturi autem totam est?
							Repudiandae dignissimos facilis accusantium alias
							nihil error sequi molestias cumque similique
							corporis placeat delectus, voluptas vitae rem
							perferendis, quae unde. At!
						</p>
						<button>View Details</button>
					</div>
				</div>
				<div className={styles.listingCard}>
					<img src="audi.jpg" alt="audi" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100000</p>
						<p className={styles.listingTitle}>Audi R8</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Eaque, ut maxime quae optio quam veritatis
							rerum sit consectetur aspernatur quo. Doloribus rem
							obcaecati nobis fugiat excepturi autem totam est?
							Repudiandae dignissimos facilis accusantium alias
							nihil error sequi molestias cumque similique
							corporis placeat delectus, voluptas vitae rem
							perferendis, quae unde. At!
						</p>
						<button>View Details</button>
					</div>
				</div>
				<div className={styles.listingCard}>
					<img src="audi.jpg" alt="audi" />
					<div className={styles.listingDetails}>
						<p className={styles.listingPrice}>$100000</p>
						<p className={styles.listingTitle}>Audi R8</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Eaque, ut maxime quae optio quam veritatis
							rerum sit consectetur aspernatur quo. Doloribus rem
							obcaecati nobis fugiat excepturi autem totam est?
							Repudiandae dignissimos facilis accusantium alias
							nihil error sequi molestias cumque similique
							corporis placeat delectus, voluptas vitae rem
							perferendis, quae unde. At!
						</p>
						<button>View Details</button>
					</div>
				</div>
			</div>

			{/* Car grid */}
			{/* <div className={styles.car - grid}>
				{Array.isArray(filteredCars) && filteredCars.length > 0 ? (
					filteredCars.map((car) => (
						<div className={styles.car - card} key={car.id}>
							<strong>
								{car.make} {car.model}
							</strong>{" "}
							<br />
							Year: {new Date(car.year).getFullYear()} <br />
							Price: ${Number(car.price).toFixed(2)} <br />
							<Link to={`/car-details/${car.id}`}>
								View Details
							</Link>
						</div>
					))
				) : (
					<p>No cars available</p>
				)}
			</div> */}
		</div>
	);
};

export default BuyerViewListingsPage;
