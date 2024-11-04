import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import useAuth from "../hooks/useAuth.jsx"; // Adjust this path accordingly
import RequireAuth from "../components/RequireAuth.jsx";
import App from "../App.jsx";

describe("App", () => {
	it("renders the App component", () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);

		screen.debug(); // prints out the JSX in the App component unto the command line
	});
});
