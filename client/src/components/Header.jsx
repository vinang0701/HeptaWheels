import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="logo">
					<Link to="/">HeptaWheels</Link>
				</div>
				<nav className="nav">
					<Link to="/new">New Cars</Link>
					<Link to="/used">Used Cars</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
