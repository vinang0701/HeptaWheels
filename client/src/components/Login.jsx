import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate(); // Initialize the useNavigate hook

	const handleSubmit = async (e) => {
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
			setPasswordError("Please enter your password!");
			hasError = true;
		}

		if (!hasError) {
			try {
				// Make a POST request to the API
				const response = await axios.post(
					"http://127.0.0.1:8080/api/login",
					{
						email: email,
						password: password,
					}
				);

				if (response.data.status === "success") {
					alert("Login successful");
					// Store user's name in a cookie
					sessionStorage.setItem(
						"username",
						response.data.user_data.username
					);
					// Redirect or perform any other action upon successful login
					navigate("/");
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
			<div className="loginPageContainer" onSubmit={handleSubmit}>
				<h1>Login</h1>
				<form className="loginInputForm">
					<div className="loginInputFields">
						{error && <p className="error">{error}</p>}
						{emailError && <p className="error">{emailError}</p>}
						<span>Email</span>
						<input
							className="loginUserName"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
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
