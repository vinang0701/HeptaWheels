import { useParams, useNavigate } from "react-router-dom";
import "./CarDetailsPage.css";

const CarDetailsPage = () => {
	const { id } = useParams(); // Retrieve car ID from the URL
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	return (
		<div className="car-details-container">
			<h1>Details for Car {id}</h1>
			<p>Car details will be displayed here.</p>
			<button onClick={handleGoBack}>Go Back</button>
		</div>
	);
};

export default CarDetailsPage;
