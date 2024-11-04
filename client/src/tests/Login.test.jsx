import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login.jsx";

describe("Login", () => {
	it("renders the App component", () => {
		render(<Login />);

		screen.debug(); // prints out the JSX in the App component unto the command line
	});
});
