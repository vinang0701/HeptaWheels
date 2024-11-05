import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CreateUser from "./CreateUser";
import "./UserAdminDashboard.css";

const UserAdminDashboard = () => {
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
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("/api/users");
				setUsers(response.data.users); // Set the users data to state
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchUsers(); // Call the fetch function
	}, []);

	const searchUserAccount = async (e) => {
		e.preventDefault();
		if (!emailPattern.test(searchEmail) && searchEmail.length > 0) {
			setError("Please type in a valid email!");
			return;
		}

		if (searchEmail.length > 0) {
			try {
				const response = await axios.get(`api/users/${searchEmail}`);

				if (response.data.user_data != null) {
					console.log(searchEmail);
					setError("");
					setSearchResult(response.data.user_data);
					setSearchEmail("");
				} else {
					setSearchEmail("");
					setError("User not found!");
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

	return (
		<div>
			<div className="userAdminContainer">
				<h4>Manage Users</h4>

				<form id="searchBarContainer">
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
						<button type="submit" onClick={searchUserAccount}>
							Search
						</button>
					</div>
				</form>
				{error && <p>{error}</p>}
				<div className="userTable">
					<div className="tableHeader">
						<div>User ID</div>
						<div>Email Address</div>
						<div>Role</div>
						<div>Status</div>
						<div>Actions</div>
					</div>

					{/* Need to conditional render dependent on searchResult */}
					{searchResult.email ? (
						<div className="tableRow" key={searchResult.id}>
							<div>{searchResult.userID}</div>
							<div>{searchResult.email}</div>
							<div>{searchResult.role}</div>
							<div>{searchResult.status}</div>
							<div>
								<button
									onClick={(e) =>
										viewAccount(searchResult.email)
									}
								>
									View Account
								</button>
							</div>
						</div>
					) : (
						<div>
							{users.map((user) => (
								<div className="tableRow" key={user.userID}>
									<div>{user.userID}</div>
									<div>{user.email}</div>
									<div>{user.role}</div>
									<div>{user.status}</div>
									<div>
										<button
											onClick={(e) =>
												viewAccount(user.email)
											}
										>
											View Account
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			{isFormVisible && (
				<div className="overlay" onClick={toggleFormVisibility} />
			)}
			{isFormVisible && (
				<CreateUser toggleFormVisibility={toggleFormVisibility} />
			)}
		</div>
	);
};

export default UserAdminDashboard;
