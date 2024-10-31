import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./AdminNav.css";

const AdminNav = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const auth = JSON.parse(sessionStorage.getItem("auth"));
	const userEmail = auth.email;
	const userRole = auth.userRole;
	console.log(userEmail);

	const handleLogout = () => {
		sessionStorage.removeItem("user-role");
		sessionStorage.removeItem("user-email");
		setAuth({});
		sessionStorage.removeItem("auth"); // Clear auth from localStorage

		alert("Logout successfull!");
		navigate("/");
	};
	return (
		<header className="admin-header">
			<div className="container">
				<div className="logo">
					<Link to="/">HeptaWheels</Link>
				</div>
				<nav className="admin-nav-items">
					{userRole ? <Link to="/admin">Manage Users</Link> : null}
					{/* Maybe try use CSS to handle the logic instead. */}
					{userRole ? <Link to="/main">Manage Profiles</Link> : null}
					{userRole ? (
						<Link to="/main" onClick={handleLogout}>
							Logout
						</Link>
					) : (
						<Link to="/login">Login</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export default AdminNav;
