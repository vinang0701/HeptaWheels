import { Link, useNavigate } from "react-router-dom";
import "./AdminNav.css";

const AdminNav = () => {
	const navigate = useNavigate();
	const userRole = sessionStorage.getItem("user-role");
	console.log(userRole);
	const handleLogout = () => {
		sessionStorage.removeItem("user-role");
		sessionStorage.removeItem("user-email");
		alert("Logout successfull!");
		navigate("/main");
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
