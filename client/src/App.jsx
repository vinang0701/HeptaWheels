import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import NewCars from "./components/NewCars.jsx";
import UsedCars from "./components/UsedCars.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import CarDetailsPage from "./components/CarDetailsPage.jsx";
import Header from "./components/Header.jsx"; // Add a Header component for navigation
import "./index.css";
import UserAdminDashboard from "./components/UserAdminDashboard.jsx";

function App() {
	return (
		<Router>
			<Header /> {/* Navigation bar for the entire site */}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/main" element={<MainPage />} />
				<Route path="/new" element={<NewCars />} />
				<Route path="/used" element={<UsedCars />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/car-details/:id" element={<CarDetailsPage />} />
				<Route
					path="/admin/dashboard"
					element={<UserAdminDashboard />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
