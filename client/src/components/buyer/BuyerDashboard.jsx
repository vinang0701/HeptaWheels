import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "./BuyerDashboard.css";

const BuyerDashboard = () => {
	const [cars, setCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://6707c1878e86a8d9e42cc865.mockapi.io/cars")
			.then((response) => response.json())
			.then((data) => {
				setCars(data);
				setFilteredCars(data); // Initially show all cars
				setLoading(false);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const handleSearch = (searchCriteria) => {
		const filtered = cars.filter((car) => {
			const matchesMake = car.make
				.toLowerCase()
				.includes(searchCriteria.make.toLowerCase());
			const matchesModel = car.model
				.toLowerCase()
				.includes(searchCriteria.model.toLowerCase());
			const matchesPrice =
				car.price >= searchCriteria.minPrice &&
				car.price <= searchCriteria.maxPrice;
			return matchesMake && matchesModel && matchesPrice;
		});
		setFilteredCars(filtered);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="main-container">
			<h1>Available Cars</h1>

			{/* Search bar */}
			<SearchBar onSearch={handleSearch} />

			{/* Car grid */}
			<div className="car-grid">
				{Array.isArray(filteredCars) && filteredCars.length > 0 ? (
					filteredCars.map((car) => (
						<div className="car-card" key={car.id}>
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
			</div>
		</div>
	);
};

export default BuyerDashboard;
