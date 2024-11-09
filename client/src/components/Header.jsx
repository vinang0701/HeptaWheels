import useAuth from "../hooks/useAuth";
import "./admin/AdminNav.css";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();

	const userEmail = auth.email;
	const userRole = auth.userRole;

	const handleLogout = () => {
		sessionStorage.removeItem("user-role");
		sessionStorage.removeItem("user-email");
		setAuth({});
		sessionStorage.removeItem("auth");

		alert("Logout successfull!");
		navigate("/");
	};

	const renderNavLinks = () => {
		switch (userRole) {
			case "User Admin":
				return (
					<>
						<Link to="/admin">Manage Users</Link>
						<Link to="/admin/profiles">Manage Profiles</Link>
					</>
				);
			case "Buyer":
				return (
					<>
						<Link to="/buyer">Browse Used Cars</Link>
						<Link to="/buyer">Favourites</Link>
					</>
				);
			case "Seller":
				return (
					<>
						<Link to="/seller">Listings</Link>
					</>
				);
			case "Agent":
				return (
					<>
						<Link to="/agent">Manage Listings</Link>
						<Link>Ratings and Reviews</Link>
					</>
				);
			default:
				return <Link to="/login">Login</Link>;
		}
	};

	return (
		<header className="header">
			<div className="container">
				{userEmail ? (
					<div className="logo">HeptaWheels</div>
				) : (
					<div className="logoButton">
						<Link to="/">HeptaWheels</Link>
					</div>
				)}

				<nav className="nav-items">
					{renderNavLinks()}

					{userEmail ? (
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					) : null}
				</nav>
			</div>
		</header>
	);
};

export default Header;
