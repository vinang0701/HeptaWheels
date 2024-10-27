import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import "./BuyerNav.css";

const BuyerNav = () => {
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
					{userName ? <Link to="/main">Shop</Link> : null}
					{userName ? <Link to="/used">Loan</Link> : null}
					{userName ? <Link to="/admin">Dashboard</Link> : null}
					{/* Maybe try use CSS to handle the logic instead. */}
					{userName ? <Link to="/main">Profile</Link> : null}
					{userName ? (
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

export default BuyerNav;
