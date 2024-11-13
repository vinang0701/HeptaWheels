import { useState } from "react";
import styles from "./CalculateLoanPage.module.css";

const CalculateLoanPage = () => {
	const [error, setError] = useState("");
	const [instalment, setInstalment] = useState(0);
	const [interestAmt, setInterestAmt] = useState(0);
	const [loanPaid, setLoanPaid] = useState(0);
	const [carPrice, setCarPrice] = useState(0);
	const [downPayment, setDownPayment] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	const [loanTerm, setLoanTerm] = useState(0);

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
				<div className={styles.calculatorContainer}>
					<div className={styles.inputContainer}>
						<label ht mlFor="carPrice">
							Car Price
						</label>
						<input type="number" />
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="downPayment">Down Payment</label>
						<input type="number" />
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="interestRate">Interest Rate</label>
						<input type="number" />
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="loanTerm">Loan Term</label>
						<input type="number" />
					</div>
					<button>Calculate</button>
				</div>
			</div>
		</div>
	);
};

export default CalculateLoanPage;
