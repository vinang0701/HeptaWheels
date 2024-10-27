import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import UsedCars from "./components/buyer/UsedCars.jsx";
import Login from "./components/Login.jsx";
import CarDetailsPage from "./components/buyer/CarDetailsPage.jsx";
import UserAdminDashboard from "./components/admin/UserAdminDashboard.jsx";
import BuyerDashboard from "./components/buyer/BuyerDashboard.jsx";
import SellerDashboard from "./components/seller/SellerDashboard.jsx";
import AgentDashboard from "./components/agent/AgentDashboard.jsx";
import "./index.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/main" element={<MainPage />} />
				<Route path="/used" element={<UsedCars />} />
				<Route path="/login" element={<Login />} />
				<Route path="/car-details/:id" element={<CarDetailsPage />} />
				<Route path="/admin" element={<UserAdminDashboard />} />
				<Route path="/buyer" element={<BuyerDashboard />} />
				<Route path="/seller" element={<SellerDashboard />} />
				<Route path="/agent" element={<AgentDashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
