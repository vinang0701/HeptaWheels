import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<div>
			<h1>Sign Up Page</h1>
			<form>
				<input type="text" placeholder="Username" />
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<button type="submit">Sign Up</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
			<Link to="/">Back to Main Page</Link>
		</div>
	);
};

export default SignUp;
