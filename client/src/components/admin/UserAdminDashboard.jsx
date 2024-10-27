import { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";
import "./UserAdminDashboard.css";
import AdminNav from "./AdminNav";

const UserAdminDashboard = () => {
	const [isFormVisible, setFormVisible] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);
	const toggleFormVisibility = () => {
		setFormVisible(!isFormVisible);
	};

	// Get all user accounts and populate
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8080/api/users"
				);
				setUsers(response.data.users); // Set the users data to state
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchUsers(); // Call the fetch function
	}, []);

	return (
		<div>
			<AdminNav />
			<div className="userAdminContainer">
				<h4>Manage Users</h4>
				<div id="searchBarContainer">
					<button onClick={toggleFormVisibility}>Add User</button>
					<div>
						<input
							type="text"
							name="searchUser"
							id="searchUser"
							placeholder="Search by email"
						/>
						<button>Search</button>
					</div>
				</div>
				<div className="userTable">
					<div className="tableHeader">
						<div>User ID</div>
						<div>Email Address</div>
						<div>Role</div>
						<div>Status</div>
						<div>Actions</div>
					</div>
					{users.map((user) => (
						<div className="tableRow" key={user.id}>
							<div>{user.userID}</div>
							<div>{user.email}</div>
							<div>{user.role}</div>
							<div>{user.status}</div>
							<div>
								<button>View Profile</button>
							</div>
						</div>
					))}
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
