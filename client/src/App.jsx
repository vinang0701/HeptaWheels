import { Route, Routes } from "react-router-dom";
import "./index.css";
import RequireAuth from "./components/RequireAuth.jsx";
import MainPage from "./components/MainPage.jsx";
import Login from "./components/Login.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import BuyerViewListingsPage from "./components/buyer/BuyerViewListingsPage.jsx";
import AgentDashboard from "./components/agent/AgentDashboard.jsx";
import ViewUserAccountPage from "./components/admin/ViewUserAccountPage.jsx";
import UpdateUserAccountPage from "./components/admin/UpdateUserAccountPage.jsx";
import Layout from "./Layout.jsx";
import SearchUserProfilePage from "./components/admin/SearchUserProfilePage.jsx";
import ViewUserProfilePage from "./components/admin/ViewUserProfilePage.jsx";
import UpdatePermissionsPage from "./components/admin/UpdatePermissionsPage.jsx";
import CreateCarListingPage from "./components/agent/CreateCarListingPage.jsx";
import UpdateCarListingPage from "./components/agent/UpdateCarListingPage.jsx";
import ViewRatingsAndReviewsPage from "./components/agent/ViewRatingsAndReviewsPage.jsx";
import SearchUserPage from "./components/admin/SearchUserPage.jsx";
import BuyerViewListingPage from "./components/buyer/BuyerViewListingPage.jsx";
import BuyerRateReviewPage from "./components/buyer/BuyerRateReviewPage.jsx";
import ViewShortlistPage from "./components/buyer/ViewShortlistPage.jsx";
import SellerViewCarListingsPage from "./components/seller/SellerViewCarListingsPage.jsx";
import SellerRateReviewPage from "./components/seller/SellerRateReviewPage.jsx";
import CalculateLoanPage from "./components/buyer/CalculateLoanPage.jsx";

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
					<Route path="/admin" element={<SearchUserPage />} />
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
						element={<SearchUserProfilePage />}
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
					<Route path="/buyer" element={<BuyerViewListingsPage />} />
					<Route
						path="/buyer/listings"
						element={<BuyerViewListingsPage />}
					/>
					<Route
						path="/buyer/listings/:listingID"
						element={<BuyerViewListingPage />}
					/>
					<Route
						path="/buyer/listings/:listingID/agent"
						element={<BuyerRateReviewPage />}
					/>
					<Route
						path="/buyer/wishlist"
						element={<ViewShortlistPage />}
					/>
					<Route path="/buyer/loan" element={<CalculateLoanPage />} />
				</Route>
				<Route element={<RequireAuth allowedRoles={["Seller"]} />}>
					<Route
						path="/seller"
						element={<SellerViewCarListingsPage />}
					/>
					<Route
						path="/seller/listings"
						element={<SellerViewCarListingsPage />}
					/>
					<Route
						path="/seller/listings/:listingID/agent"
						element={<SellerRateReviewPage />}
					/>
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
					<Route
						path="/agent/ratings"
						element={<ViewRatingsAndReviewsPage />}
					/>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
