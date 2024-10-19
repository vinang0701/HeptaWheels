import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="logo">
				<h1>Heptawheels</h1>
			</div>
			<ul className="nav-links">
				<li>
					<Link to="/new">New</Link>
				</li>
				<li>
					<Link to="/used">Used</Link>
				</li>
				<li>
					<Link to="/electric">Electric</Link>
				</li>
				<li>
					<Link to="/loan">Loan</Link>
				</li>
				<li>
					<Link to="/rent">Rent</Link>
				</li>
				<li>
					<Link to="/sell">Sell</Link>
				</li>
			</ul>
			<div className="auth-buttons">
				<Link to="/login" className="login">
					Login
				</Link>
				<Link to="/signup" className="signup">
					Sign Up
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
