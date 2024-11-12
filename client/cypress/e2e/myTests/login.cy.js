/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Auth", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		cy.visit("localhost:5000/login");
	});

	it("Submit empty form", () => {
		// find button and click
		cy.get("button").contains("Login").click();

		cy.get("input:invalid").should("have.length", 2);
		cy.get('input[name="email"]').then(($input) => {
			expect($input[0].validationMessage).to.eq(
				"Please fill out this field."
			);
		});
	});

	it("Type invalid email and submit", () => {
		// find button and click
		cy.get('input[name="email"]').type("admin.com");
		cy.get('input[name="password"]').type("123");
		cy.get("button").contains("Login").click();

		cy.get("input:invalid").should("have.length", 1);
		cy.get('input[name="email"]').then(($input) => {
			expect($input[0].validationMessage).to.eq(
				"Please enter an email address."
			);
		});
	});

	it("Type invalid credentials and login should fail", () => {
		// find button and click
		cy.get('input[name="email"]').type("testdata@gmail.com");
		cy.get('input[name="password"]').type("123");

		cy.intercept({
			method: "POST",
			url: "/api/login",
		}).as("login"); // and assign an alias

		cy.get("button").contains("Login").click();

		cy.wait("@login").then((interception) => {
			expect(interception.response.statusCode).to.eq(404);
			expect(interception.response.body.user_data).to.eq(null);
		});

		cy.get("p").should(
			"contain",
			"Email/password is wrong! Please try again."
		);
	});

	it("Types in valid credentials and should login successfully", () => {
		// fill in the form
		cy.get('input[name="email"]').type("admin@gmail.com");
		cy.get('input[name="password"]').type("123");

		cy.intercept({
			method: "POST",
			url: "/api/login",
		}).as("login"); // and assign an alias

		// submit the form
		cy.get("button").contains("Login").click();

		cy.wait("@login").then((interception) => {
			expect(interception.response.statusCode).to.eq(200);
			expect(interception.response.body.user_data).to.deep.eq({
				email: "admin@gmail.com",
				password: "123",
				role: "User Admin",
				status: "Active",
				userID: 52,
			});
		});

		cy.url().should("include", "/admin");
	});
});
