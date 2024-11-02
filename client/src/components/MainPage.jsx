import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import Header from "./Header";

const MainPage = () => {
	const navigate = useNavigate();
	const loginButton = () => {
		navigate("/login");
	};

	return (
		<div className="pageContainer">
			<div className="landing-page-container">
				<div className="hero-section-text-container">
					<h1>
						Find Your Perfect Ride with{" "}
						<span className="logo">HeptaWheels</span>
					</h1>
					<p>
						Whether you&apos;re searching for reliability, luxury,
						or a deal that just can’t be missed, HeptaWheels has you
						covered. Explore an unbeatable selection of quality used
						cars, fully inspected and ready for the road. Start your
						journey with us. Drive away your dream car today!
					</p>
					<button onClick={loginButton}>Login</button>
				</div>
				<img src="./src/assets/car.jpg" alt="car image" />
			</div>
		</div>
	);
};

export default MainPage;
