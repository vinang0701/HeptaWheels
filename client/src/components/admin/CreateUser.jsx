import { useState } from "react";
import axios from "axios";
import "./UserAdminDashboard.css";

const CreateUser = ({ toggleFormVisibility }) => {
	// PUT request to backend
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [roleError, setRoleError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent form from refreshing the page

		let hasError = false;

		// Reset errors first
		setEmailError("");
		setPasswordError("");
		setRoleError("");
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
			setPasswordError("Please enter password!");
			hasError = true;
		}

		if (role === "") {
			setRoleError("Please enter role!");
			hasError = true;
		}

		if (!hasError) {
			var data = {
				email: email.trim(),
				password: password,
				role: role,
			};

			try {
				// Make a POST request to the API
				const response = await axios.put(
					"http://127.0.0.1:8080/api/users",
					data
				);

				if (response.data.status === "success") {
					alert("User Successfully Added!");
					window.location.reload();
				} else {
					setError(response.data.message);
				}
			} catch (err) {
				// Handle error
				setError("User already exists! Please check again.");
			}
		}
	};

	return (
		<div>
			<div className="userFormContainer">
				<div className="userFormHeader">
					<h4>Create User</h4>
					<button onClick={toggleFormVisibility} id="closeFormButton">
						Close
					</button>
				</div>

				<form className="createUserForm" onSubmit={handleSubmit}>
					{error && <span className="error">{error}</span>}
					<div>
						{emailError && (
							<span className="error">{emailError}</span>
						)}
						<div className="userInputContainer">
							<span>Email</span>
							<input
								type="text"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>

					<div>
						{passwordError && (
							<span className="error">{passwordError}</span>
						)}
						<div className="userInputContainer">
							<span>Password</span>
							<input
								type="text"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div>
						{roleError && (
							<span className="error">{roleError}</span>
						)}
						<div className="userInputContainer">
							<span>Role</span>
							<input
								type="text"
								name="userRole"
								value={role}
								onChange={(e) => setRole(e.target.value)}
							/>
						</div>
					</div>
					<input
						type="submit"
						value="Add User"
						id="submitCreateUser"
					/>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
