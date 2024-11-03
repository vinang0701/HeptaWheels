import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import axios from "../../api/axios";

const UpdatePermissionsPage = () => {
	const { profile } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState("");
	const [error, setError] = useState("");

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	const handleEditProfile = () => {
		navigate(`/profiles/${encodeURIComponent(profile)}/edit`, {
			state: { profile },
		});
	};

	return (
		<div>
			<div>{profile}</div>
		</div>
	);
};

export default UpdatePermissionsPage;
