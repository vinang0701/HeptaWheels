import { Route, Routes } from "react-router-dom";
import "./index.css";
import RequireAuth from "./components/RequireAuth.jsx";
import Header from "./components/Header.jsx";
import MainPage from "./components/MainPage.jsx";
import UsedCars from "./components/buyer/UsedCars.jsx";
import Login from "./components/Login.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import UserAdminDashboard from "./components/admin/UserAdminDashboard.jsx";
import BuyerDashboard from "./components/buyer/BuyerDashboard.jsx";
import CarDetailsPage from "./components/buyer/CarDetailsPage.jsx";
import SellerDashboard from "./components/seller/SellerDashboard.jsx";
import AgentDashboard from "./components/agent/AgentDashboard.jsx";
import ViewUserAccountPage from "./components/admin/ViewUserAccountPage.jsx";
import UpdateUserAccountPage from "./components/admin/UpdateUserAccountPage.jsx";
import Layout from "./Layout.jsx";
import ManageUserProfilePage from "./components/admin/ManageUserProfilePage.jsx";
import ViewUserProfilePage from "./components/admin/ViewUserProfilePage.jsx";
import UpdatePermissionsPage from "./components/admin/UpdatePermissionsPage.jsx";
import CreateCarListingPage from "./components/agent/CreateCarListingPage.jsx";
import UpdateCarListingPage from "./components/agent/UpdateCarListingPage.jsx";

function App() {
	return (
		<Routes>
			{/* public routes */}
			<Route path="/" element={<Layout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<MainPage />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* Protected Routes */}
				<Route element={<RequireAuth allowedRoles={["User Admin"]} />}>
					<Route path="/admin" element={<UserAdminDashboard />} />
					<Route
						path="users/:email"
						element={<ViewUserAccountPage />}
					/>
					<Route
						path="users/:email/edit"
						element={<UpdateUserAccountPage />}
					/>
					<Route
						path="/admin/profiles"
						element={<ManageUserProfilePage />}
					/>
					<Route
						path="/admin/profiles/:profile_name"
						element={<ViewUserProfilePage />}
					/>
					<Route
						path="/admin/profiles/:profile_name/edit"
						element={<UpdatePermissionsPage />}
					/>
				</Route>
				<Route element={<RequireAuth allowedRoles={["Buyer"]} />}>
					<Route path="buyer" element={<BuyerDashboard />} />
					<Route path="used" element={<UsedCars />} />
					<Route
						path="car-details/:id"
						element={<CarDetailsPage />}
					/>
				</Route>
				<Route element={<RequireAuth allowedRoles={["Seller"]} />}>
					<Route path="seller" element={<SellerDashboard />} />
				</Route>
				<Route element={<RequireAuth allowedRoles={["Agent"]} />}>
					<Route path="/agent" element={<AgentDashboard />} />
					<Route
						path="/agent/create"
						element={<CreateCarListingPage />}
					/>
					<Route
						path="/agent/listings/:listingID"
						element={<UpdateCarListingPage />}
					/>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
