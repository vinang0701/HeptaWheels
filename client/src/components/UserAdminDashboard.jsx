import React from "react";
import { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import "./UserAdminDashboard.css";

const UserAdminDashboard = () => {
	const [isFormVisible, setFormVisible] = useState(false);
	const toggleFormVisibility = () => {
		setFormVisible(!isFormVisible);
	};

	const users = [
		{
			id: "#001",
			name: "John Doe",
			email: "johndoe@gmail.com",
			role: "User Admin",
			status: "Active",
		},
		{
			id: "#002",
			name: "Jane Smith",
			email: "janesmith@gmail.com",
			role: "User Admin",
			status: "Active",
		},
		{
			id: "#003",
			name: "Alice Johnson",
			email: "alicejohnson@gmail.com",
			role: "User Admin",
			status: "Active",
		},
	];

	return (
		<div className="userAdminContainer">
			<h4>Manage Users</h4>
			<div id="searchBarContainer">
				<button onClick={toggleFormVisibility}>Add User</button>
				<div>
					<input
						type="text"
						name="searchUser"
						id="searchUser"
						placeholder="Search by ..."
					/>
					<button>Search</button>
				</div>
			</div>
			<div className="userTable">
				<div className="tableHeader">
					<div>User ID</div>
					<div>Full Name</div>
					<div>Email Address</div>
					<div>Role</div>
					<div>Status</div>
					<div>Actions</div>
				</div>
				{users.map((user) => (
					<div className="tableRow" key={user.id}>
						<div>{user.id}</div>
						<div>{user.name}</div>
						<div>{user.email}</div>
						<div>{user.role}</div>
						<div>{user.status}</div>
						<div>
							<button>View Profile</button>
						</div>
					</div>
				))}
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
