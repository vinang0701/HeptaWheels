import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUserAccountPage from "./CreateUserAccountPage";
import styles from "./SearchUserPage.module.css";

const SearchUserPage = () => {
	const [isFormVisible, setFormVisible] = useState(false);
	const [error, setError] = useState("");
	const [searchEmail, setSearchEmail] = useState("");
	const [searchResult, setSearchResult] = useState({});
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const toggleFormVisibility = (e) => {
		e.preventDefault();
		setFormVisible(!isFormVisible);
	};

	// Get all user accounts and populate
	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		try {
	// 			const response = await axios.get("/api/users");
	// 			setUsers(response.data.users); // Set the users data to state
	// 		} catch (err) {
	// 			setError("Error fetching data");
	// 			console.error(err);
	// 		}
	// 	};

	// 	fetchUsers(); // Call the fetch function
	// }, []);

	const searchUser = async (e, email) => {
		e.preventDefault();
		if (!emailPattern.test(email) && email.length > 0) {
			setError("Please type in a valid email!");
			return;
		}

		if (email.length > 0) {
			try {
				const response = await axios.post("/api/users/search", {
					email: email,
				});

				if (response.data != null) {
					console.log(email);
					setError("");
					setSearchResult(response.data);
					setSearchEmail("");
				} else {
					setError("User not found!");
					setSearchEmail("");
				}
			} catch (err) {
				setSearchEmail("");
				setSearchResult({});
				setError("User not found!");
				console.log(error);
			}
		} else {
			setError("");
			setSearchEmail("");
			setSearchResult({});
		}
	};

	const viewAccount = (email) => {
		navigate(`/users/${encodeURIComponent(email)}`);
	};

	if (Object.keys(searchResult).length === 0) {
		return (
			<div>
				<div className={styles.userAdminContainer}>
					<h4>Manage Users</h4>

					<form className={styles.searchBarContainer}>
						<button onClick={toggleFormVisibility}>Add User</button>
						<div>
							<input
								type="text"
								name="searchUser"
								id="searchUser"
								value={searchEmail}
								placeholder="Search by email"
								onChange={(e) => setSearchEmail(e.target.value)}
								autoComplete="off"
							/>
							<button
								type="submit"
								onClick={(e) => searchUser(e, searchEmail)}
							>
								Search
							</button>
						</div>
					</form>
					{error ? (
						<p className={styles.error}>{error}</p>
					) : (
						<div>Please search for a user</div>
					)}
				</div>

				{isFormVisible && (
					<div
						className={styles.overlay}
						onClick={toggleFormVisibility}
					/>
				)}
				{isFormVisible && (
					<CreateUserAccountPage
						toggleFormVisibility={toggleFormVisibility}
					/>
				)}
			</div>
		);
	}

	return (
		<div>
			<div className={styles.userAdminContainer}>
				<h4>Manage Users</h4>

				<form className={styles.searchBarContainer}>
					<button onClick={toggleFormVisibility}>Add User</button>
					<div>
						<input
							type="text"
							name="searchUser"
							id="searchUser"
							value={searchEmail}
							placeholder="Search by email"
							onChange={(e) => setSearchEmail(e.target.value)}
							autoComplete="off"
						/>
						<button type="submit" onClick={searchUser}>
							Search
						</button>
					</div>
				</form>
				<div className={styles.userTable}>
					<div className={styles.tableHeader}>
						<div>User ID</div>
						<div>Email Address</div>
						<div>Role</div>
						<div>Status</div>
						<div>Actions</div>
					</div>

					{/* Need to conditional render dependent on searchResult */}
					{searchResult.email ? (
						<div className={styles.tableRow} key={searchResult.id}>
							<div>{searchResult.userID}</div>
							<div>{searchResult.email}</div>
							<div>{searchResult.role}</div>
							<div>{searchResult.status}</div>
							<div>
								<button
									onClick={(e) =>
										viewAccount(e, searchResult.email)
									}
								>
									View Account
								</button>
							</div>
						</div>
					) : // <div>
					// 	{users.map((user) => (
					// 		<div
					// 			className={styles.tableRow}
					// 			key={user.userID}
					// 		>
					// 			<div>{user.userID}</div>
					// 			<div>{user.email}</div>
					// 			<div>{user.role}</div>
					// 			<div>{user.status}</div>
					// 			<div>
					// 				<button
					// 					onClick={(e) =>
					// 						viewAccount(user.email)
					// 					}
					// 				>
					// 					View Account
					// 				</button>
					// 			</div>
					// 		</div>
					// 	))}
					// </div>
					null}
				</div>
			</div>
			{isFormVisible && (
				<div
					className={styles.overlay}
					onClick={toggleFormVisibility}
				/>
			)}
			{isFormVisible && (
				<CreateUserAccountPage
					toggleFormVisibility={toggleFormVisibility}
				/>
			)}
		</div>
	);
};

export default SearchUserPage;
