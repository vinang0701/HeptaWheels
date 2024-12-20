import { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./SearchUserPage.module.css";

const CreateUserAccountPage = ({ toggleFormVisibility }) => {
	// PUT request to backend
	const [profiles, setProfiles] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [userRoles, setUserRoles] = useState([]);
	// const USER_ROLES = ["User Admin", "Buyer", "Seller", "Agent"];

	const handleCreateAcc = async (e) => {
		e.preventDefault(); // Prevent form from refreshing the page

		let hasError = false;

		// Reset errors first
		setEmailError("");
		setSuccess("");
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
			setPasswordError("Please enter password!");
			hasError = true;
		}

		if (!hasError) {
			var data = {
				email: email.trim(),
				password: password.trim(),
				role: role,
			};

			try {
				// Make a POST request to the API
				const response = await axios.post("/api/users", data);

				if (response.data.status === "success") {
					// alert("User Successfully Added!");
					setSuccess("User Successfully Added!");
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					setError(response.data.message);
				}
			} catch (err) {
				// Handle error
				setError("User already exists! Please check again.");
			}
		}
	};
	// Get all user profiles
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await axios.get("/api/profiles");

				// Set the profiles data to state
				// Check if response contains user profiles data
				if (response.data) {
					const activeRoles = response.data
						.filter((profile) => profile.status === "Active") // Filter for active profiles
						.map((profile) => profile.profile_name); // Extract roles of active profiles

					setProfiles(response.data); // Set profiles data to state
					setUserRoles(activeRoles); // Set the roles of active profiles
				}
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchProfiles(); // Call the fetch function
	}, []);

	console.log(profiles);
	console.log(userRoles);

	return (
		<div>
			<div className={styles.userFormContainer}>
				<div className={styles.userFormHeader}>
					<h4>Create User</h4>
					<button onClick={toggleFormVisibility} id="closeFormButton">
						Close
					</button>
				</div>

				<form
					className={styles.createUserForm}
					onSubmit={handleCreateAcc}
				>
					{error && (
						<span className={styles.createError}>{error}</span>
					)}
					{success && (
						<span className={styles.success}>{success}</span>
					)}
					<div>
						<div className={styles.userInputContainer}>
							{/* {emailError && (
								<span className={styles.error}>{emailError}</span>
							)} */}
							<label>Email</label>
							<input
								type="text"
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="off"
								required
							/>
						</div>
					</div>

					<div>
						<div className={styles.userInputContainer}>
							{/* {passwordError && (
								<span className={styles.error}>{passwordError}</span>
							)} */}
							<label>Password</label>
							<input
								type="text"
								name="password"
								value={password}
								autoComplete="off"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					<div>
						<div className={styles.userInputContainer}>
							<label>Role</label>
							{/* <input
								type="text"
								name="userRole"
								value={role}
								onChange={(e) => setRole(e.target.value)}
							/> */}
							<select
								name="selectRole"
								id="selectRole"
								value={role || ""}
								onChange={(e) => setRole(e.target.value)}
							>
								{userRoles.map((user_role) => (
									<option key={user_role} value={user_role}>
										{user_role}
									</option>
								))}
								<option value="" disabled hidden>
									Select a role
								</option>
							</select>
						</div>
					</div>
					<input
						type="submit"
						value="Add User"
						id="submitCreateUser"
						className={styles.submitCreateUser}
					/>
				</form>
			</div>
		</div>
	);
};

export default CreateUserAccountPage;
