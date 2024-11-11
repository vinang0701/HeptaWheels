import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "./Login.css";

const Login = () => {
	const { auth, setAuth } = useAuth();
	// const location = useLocation();

	// State needed for user login details
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");

	// States for user input error
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// To navigate user to respective home page
	const handleSubmit = async (e) => {
		const navigate = useNavigate();

		e.preventDefault(); // Prevent form from refreshing the page

		let hasError = false;

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
			// Reset user inputs
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
						headers: { "Access-Control-Allow-Origin": "*" },
					}
				);
				console.log(response.data);

				if (response.data.status === "success") {
					// alert("Login successful");
					setSuccess("Login successful!");

					sessionStorage.setItem("loggedIn", true);

					const userRole = response.data.user_data.role;
					const userID = response.data.user_data.userID;
					console.log(userRole);

					setAuth({ email, password, userRole, userID });
					sessionStorage.setItem(
						"auth",
						JSON.stringify({ email, userRole, userID })
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
					setEmail("");
					setPassword("");
					setError(response.data.message);
				}
			} catch (err) {
				// Handle error
				setError("Email/password is wrong! Please try again.");
			}
		}
	};

	const goHome = () => {
		// Check role
		const navigate = useNavigate();

		const role = auth?.userRole;
		switch (role) {
			case "User Admin":
				navigate("/admin");
				break;
			case "Agent":
				navigate("/agent");
				break;
			case "Buyer":
				navigate("/buyer");
				break;
			case "Seller":
				navigate("/seller");
				break;
			default:
				navigate("/");
				break;
		}
	};

	return (
		<div>
			<div className="loginPageContainer">
				{auth?.userRole ? (
					<div>
						<h1>You are already logged In</h1>
						<button className="goHomeButton" onClick={goHome}>
							Go home
						</button>
					</div>
				) : (
					<div className="loginPageContainer">
						{success && <div>{success}</div>}
						<h1>Login</h1>
						<form
							className="loginInputForm"
							onSubmit={handleSubmit}
						>
							<div className="loginInputFields">
								{error && <p className="error">{error}</p>}
								{emailError && (
									<p className="error">{emailError}</p>
								)}
								<label htmlFor="email">Email</label>
								<input
									className="loginUserName"
									type="text"
									id="email"
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
								<label htmlFor="password">Password</label>
								<input
									className="loginPassword"
									id="password"
									type="password"
									value={password}
									autoComplete="off"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<button id="submitLogin" type="submit">
								Login
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
