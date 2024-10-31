import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "./Login.css";
import Header from "./Header";

const Login = () => {
	const { setAuth } = useAuth();

	// State needed for user login details
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// States for user input error
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// To navigate user to respective home page
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent form from refreshing the page

		let hasError = false;

		// Reset user inputs
		setEmail("");
		setPassword("");

		// Reset errors first
		setEmailError("");
		setPasswordError("");
		setError("");

		// Validate email format
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
		if (email === "") {
			setEmailError("Please enter your email!");
			hasError = true;
		} else if (!emailPattern.test(email)) {
			setEmailError("Please enter a valid email address");
			hasError = true;
		}

		// Validate password
		if (password === "") {
			setPasswordError("Please enter your password!");
			hasError = true;
		}

		if (!hasError) {
			try {
				// Make a POST request to the API
				const response = await axios.post(
					"/api/login",
					{
						email: email,
						password: password,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				console.log(response.data);

				if (response.data.status === "success") {
					alert("Login successful");

					sessionStorage.setItem("loggedIn", true);

					const userRole = response.data.user_data.role;
					console.log(userRole);

					setAuth({ email, password, userRole });
					sessionStorage.setItem(
						"auth",
						JSON.stringify({ email, userRole })
					);

					// Redirect user based on role
					switch (userRole) {
						case "User Admin":
							navigate("/admin");
							break;
						case "Buyer":
							navigate("/buyer");
							break;
						case "Seller":
							navigate("/seller");
							break;
						case "Agent":
							navigate("/agent");
							break;
						default:
							console.error("Unknown role:", userRole);
							// Optionally navigate to a default route or show an error
							break;
					}
				} else {
					setError(response.data.message);
				}
			} catch (err) {
				// Handle error
				setError("Email/password is wrong! Please try again.");
			}
		}
	};

	return (
		<div>
			<div className="loginPageContainer">
				<h1>Login</h1>
				<form className="loginInputForm" onSubmit={handleSubmit}>
					<div className="loginInputFields">
						{error && <p className="error">{error}</p>}
						{emailError && <p className="error">{emailError}</p>}
						<span>Email</span>
						<input
							className="loginUserName"
							type="text"
							value={email}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="loginInputFields">
						{passwordError && (
							<p className="error">{passwordError}</p>
						)}
						<span>Password</span>
						<input
							className="loginPassword"
							type="password"
							value={password}
							autoComplete="off"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button id="submitLogin" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
