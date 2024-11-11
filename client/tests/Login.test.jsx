// Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
	MemoryRouter,
	useNavigate,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import Layout from "../src/Layout";
import Login from "../src/components/Login";
import * as useAuthModule from "../src/hooks/useAuth";
import axios from "axios";
import { expect, vi } from "vitest";
import UserAdminDashboard from "../src/components/admin/UserAdminDashboard";
import { AuthProvider } from "../src/context/AuthProvider";
import AgentDashboard from "../src/components/agent/AgentDashboard";

// Mocking the `useAuth` hook
// Partial mock of useAuth to provide a mock return value
const mockSetAuth = vi.fn();
vi.mock("../src/hooks/useAuth", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		default: () => ({
			auth: {},
			setAuth: mockSetAuth,
		}),
	};
});

// Mocking axios
vi.mock("axios");

// Mock `useNavigate` for testing redirection
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useNavigate: vi.fn(), // Return mocked navigate function
	};
});

describe("Login Component", () => {
	it("Enters correct credentails and redirects on successful login", async () => {
		render(
			<MemoryRouter>
				<Routes path="/" element={<Layout />}>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</MemoryRouter>
		);

		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "admin@gmail.com" },
		});

		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: "123" },
		});

		expect(screen.getByLabelText("Email").value === "admin@gmail.com");
		expect(screen.getByLabelText("Password").value === "1232");
		console.log(screen.getByLabelText("Password").value);

		fireEvent.click(screen.getByRole("button", { name: /login/i }));
	}, 10000);
});
