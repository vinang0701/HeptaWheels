import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import axios from "axios";
import CreateUser from "./CreateUser";
import "./UserAdminDashboard.css";
import AdminNav from "./AdminNav";

const ViewUserAccountPage = () => {
	const { email } = useParams(); // Retrieve car ID from the URL
	const navigate = useNavigate();
	const [user, setUser] = useState("");
	const [error, setError] = useState("");

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				var userEmail = decodeURIComponent(email);
				console.log(userEmail);
				const response = await axios.get(
					`http://127.0.0.1:8080/api/users/${userEmail}`
				);
				var user_data = response.data.user_data;
				setUser(user_data);
				console.log(user_data);
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};

		fetchUser(); // Call the fetch function
	}, []);

	return (
		<div>
			<AdminNav />
			<h1>{user.email}</h1>
			<h1>{user.role}</h1>
			<h1>{user.status}</h1>
		</div>
	);
};

export default ViewUserAccountPage;
