import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();

	const userEmail = auth?.email;
	const userRole = auth?.userRole;

	const logout = () => {
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
						<Link to="/buyer">View Listings</Link>
						<Link to="/buyer/wishlist">Wishlist</Link>
						<Link to="/buyer/loan">Calculate Loan</Link>
					</>
				);
			case "Seller":
				return (
					<>
						<Link to="/seller">My Listings</Link>
					</>
				);
			case "Agent":
				return (
					<>
						<Link to="/agent">Manage Listings</Link>
						<Link to="/agent/ratings">Ratings and Reviews</Link>
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
						<Link to="/" onClick={logout}>
							Logout
						</Link>
					) : null}
				</nav>
			</div>
		</header>
	);
};

export default Header;
