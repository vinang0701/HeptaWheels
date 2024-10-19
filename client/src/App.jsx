import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewCars from "./components/NewCars";
import UsedCars from "./components/UsedCars";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CarDetailsPage from "./components/CarDetailsPage";
import Header from "./components/Header"; // Add a Header component for navigation

function App() {
	return (
		<Router>
			<Header /> {/* Navigation bar for the entire site */}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/new" element={<NewCars />} />
				<Route path="/used" element={<UsedCars />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/car-details/:id" element={<CarDetailsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
