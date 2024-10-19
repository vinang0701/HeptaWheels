import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewCars.css";

const NewCars = () => {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch new cars data from the mock API
		fetch("https://6707c1878e86a8d9e42cc865.mockapi.io/cars") // Assuming there's a separate endpoint for new cars
			.then((response) => response.json())
			.then((data) => {
				setCars(data);
				setLoading(false);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	if (loading) {
		return <div>Loading new cars...</div>;
	}

	return (
		<div className="new-cars-container">
			<h1>New Cars</h1>
			<div className="new-car-grid">
				{Array.isArray(cars) && cars.length > 0 ? (
					cars.map((car) => (
						<div className="new-car-card" key={car.id}>
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
					<p>No new cars available</p>
				)}
			</div>
			<Link className="back-link" to="/">
				Back to Main Page
			</Link>
		</div>
	);
};

export default NewCars;
