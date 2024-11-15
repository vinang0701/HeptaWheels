import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./ViewUserAccountPage.module.css";

const UpdateUserAccountPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = location.state || {}; // Retrieve `user` from the state
	const currentEmail = user.email;
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [role, setRole] = useState(user.role);
	const [status, setStatus] = useState(user.status);
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [userRoles, setUserRoles] = useState([]);
	const [profiles, setProfiles] = useState([]);

	// Get all user accounts and populate
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await axios.get("/api/profiles");

				// Set the profiles data to state
				setProfiles(response.data.user_profiles);
				const roles = response.data.user_profiles.map(
					(profile) => profile.profile_name
				);
				setUserRoles(roles);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchProfiles(); // Call the fetch function
	}, []);

	useEffect;

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	const updateUserAccount = async (
		e,
		currentEmail,
		email,
		pwd,
		status,
		role
	) => {
		e.preventDefault();
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
		if (pwd === "") {
			setPasswordError("Please enter password!");
			hasError = true;
		}

		if (!hasError) {
			var data = {
				email: email.trim(),
				password: pwd.trim(),
				role: role,
				status: status,
			};

			try {
				// Make a POST request to the API
				const response = await axios.put(
					`/api/users/${currentEmail}`,
					data
				);

				if (response.data.status === "success") {
					alert("User Successfully Updated!");
					navigate("/admin");
				} else {
					setError(response.data.message);
				}
			} catch (err) {
				// Handle error
				setError("User cannot be update! Please check again.");
			}
		}
	};

	return (
		<div>
			<p onClick={handleGoBack} className={styles.backButton}>
				&lt; Back
			</p>
			<div className={styles.card}>
				<h4>User Account</h4>
				<form
					className={styles.userDetailsContainer}
					onSubmit={(e) =>
						updateUserAccount(
							e,
							currentEmail,
							email,
							password,
							status,
							role
						)
					}
				>
					<div className={styles.userDetails}>
						<label>User ID</label>
						<div>{user.userID}</div>
					</div>
					<div className={styles.userDetails}>
						<label>Email</label>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.userDetails}>
						<label>Password</label>
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className={styles.userDetails}>
						<label>Role</label>
						<select
							name="selectRole"
							id="selectRole"
							onChange={(e) => setRole(e.target.value)}
							value={role}
						>
							{userRoles.map((user_role) => (
								<option key={user_role} value={user_role}>
									{user_role}
								</option>
							))}
						</select>
					</div>
					<div className={styles.userDetails}>
						<label>Status</label>
						<select
							defaultValue={user.status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="Active">Active</option>
							<option value="Suspended">Suspended</option>
						</select>
					</div>
					<button type="submit" className={styles.submitButton}>
						Save Changes
					</button>
				</form>

				<button className={styles.editButton} onClick={handleGoBack}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default UpdateUserAccountPage;
