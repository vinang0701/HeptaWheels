import { useState, useEffect } from "react";
import Image from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import Header from "./Header";

const MainPage = () => {
	const [loading, setLoading] = useState(true);

	return (
		<div>
			<Header />
			<div className="landing-page-container">
				<div className="hero-section-text-container">
					<h1>Find Your Perfect Ride with HeptaWheels!</h1>
					<p>
						Whether you're searching for reliability, luxury, or a
						deal that just can’t be missed, HeptaWheels has you
						covered. Explore an unbeatable selection of quality used
						cars, fully inspected and ready for the road. Start your
						journey with us—drive away your dream car today!
					</p>
					<button>Login</button>
				</div>
				<img src="./src/assets/car.jpg" alt="car image" />
			</div>
		</div>
	);
};

export default MainPage;
