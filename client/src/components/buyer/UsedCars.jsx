import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsedCars = () => {
	const [listingArray, setListingArray] = useState([]);

	const fetchAPI = async () => {
		const response = await axios.get("http://localhost:8080/api/listings");
		setListingArray(response.data.listings);
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<div>
			<h1>Used Cars</h1>
			<p>List of used cars will go here.</p>
			<Link to="/">Back to Main Page</Link>
			<p>
				{listingArray.map((listing, index) => (
					<span key={index}>{listing}</span>
				))}
			</p>
		</div>
	);
};

export default UsedCars;
