import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import "./Header.css";

const Header = () => {
	const navigate = useNavigate();
	const userName = sessionStorage.getItem("username");
	console.log(userName);
	const handleLogout = () => {
		sessionStorage.removeItem("username");
		alert("Logout successfull!");
		navigate("/main");
	};
	return (
		<header className="header">
			<div className="container">
				<div className="logo">
					<Link to="/">HeptaWheels</Link>
				</div>
				<nav className="nav">
					<Link to="/login">Login</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
