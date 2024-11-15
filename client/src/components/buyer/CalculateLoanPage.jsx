import { useState } from "react";
import styles from "./CalculateLoanPage.module.css";

const CalculateLoanPage = () => {
	const [error, setError] = useState("");
	const [instalment, setInstalment] = useState(0);
	const [interestAmt, setInterestAmt] = useState(0);
	const [loanPaid, setLoanPaid] = useState(0);
	// const [carPrice, setCarPrice] = useState(0);
	// const [downPayment, setDownPayment] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	// const [loanTerm, setLoanTerm] = useState(0);

	const [formValues, setFormValues] = useState({
		carPrice: "",
		downPayment: "",
		loanTerm: "",
		interestRate: "", // Start with empty string for easier handling of decimal input
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "interestRate") {
			// Allow empty input, or digits up to 2 decimal places, and ensure the value is 10 or less
			if (
				value === "" ||
				(/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 10)
			) {
				setFormValues((prevValues) => ({
					...prevValues,
					[name]: value,
				}));
			}
		} else {
			// Allow only digits for other fields
			if (/^\d*$/.test(value)) {
				setFormValues((prevValues) => ({
					...prevValues,
					[name]: value,
				}));
			}
		}
	};

	const calculate = (e, carPrice, downPayment, interestRate, loanTerm) => {
		e.preventDefault();
		setError("");
		if (carPrice == 0 || carPrice < 10000) {
			setError("Please fill in an appropriate car price amount.");
			return;
		}
		if (downPayment == 0 || downPayment > carPrice) {
			setError("Please fill in an appropriate down payment amount.");
			return;
		}
		if (interestRate == 0) {
			setError("Please fill in interest rate.");
			return;
		}
		if (loanTerm == 0) {
			setError("Please fill in loan term in month.");
			return;
		}

		const principal = parseFloat(carPrice) - parseFloat(downPayment);
		const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
		const totalPayments = parseInt(loanTerm);

		// Total Payment and Total Interest
		const totalInterest = principal * monthlyInterestRate * totalPayments;
		const totalPaid = totalInterest + principal;
		const monthlyPayment = totalPaid / loanTerm;

		setInstalment(monthlyPayment.toFixed(0));
		setInterestAmt(totalInterest.toFixed(0));
		setLoanPaid(totalPaid.toFixed(0));
	};

	return (
		<div className={styles.calculatePageContainer}>
			<h4>Loan Calculator</h4>
			<div className={styles.calculatorCard}>
				<div className={styles.resultsContainer}>
					<div className={styles.textbox}>
						<p>Monthly Payment</p>
						<p className={styles.instalmentText}>
							${instalment} / mth
						</p>
					</div>
					<div className={styles.secondRow}>
						<div className={styles.textbox}>
							<p>Total Interest Paid</p>
							<p className={styles.amountText}>${interestAmt}</p>
						</div>
						<div className={styles.textbox}>
							<p>Total Paid on Loan</p>
							<p className={styles.amountText}>${loanPaid}</p>
						</div>
					</div>
				</div>
				{error && <div className={styles.error}>{error}</div>}
				<form
					className={styles.calculatorContainer}
					onSubmit={(e) =>
						calculate(
							e,
							formValues.carPrice,
							formValues.downPayment,
							formValues.interestRate,
							formValues.loanTerm
						)
					}
				>
					<div className={styles.inputContainer}>
						<label htmlFor="carPrice">Car Price</label>
						<input
							type="text"
							name="carPrice"
							value={formValues.carPrice}
							onChange={handleInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="downPayment">Down Payment</label>
						<input
							type="text"
							name="downPayment"
							value={formValues.downPayment}
							onChange={handleInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="interestRate">Interest Rate %</label>
						<input
							type="number"
							name="interestRate"
							value={formValues.interestRate}
							onChange={handleInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="loanTerm">Loan Term</label>
						<input
							type="text"
							name="loanTerm"
							value={formValues.loanTerm}
							onChange={handleInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<button type="submit">Calculate</button>
				</form>
			</div>
		</div>
	);
};

export default CalculateLoanPage;
