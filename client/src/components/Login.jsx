import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div>
			<h1>Login Page</h1>
			<form>
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">Login</button>
			</form>
			<p>
				Don&lsquo;t have an account? <Link to="/signup">Sign Up</Link>
			</p>
			<Link to="/">Back to Main Page</Link>
		</div>
	);
};

export default Login;
