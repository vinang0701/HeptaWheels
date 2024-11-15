import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale, // X-axis
	LinearScale, // y-axis
	PointElement,
	Title,
} from "chart.js";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SellerTrackViewsPage.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const SellerTrackViewsPage = () => {
	const { listingID } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [dataframe, setDataframe] = useState([]);
	const [labels, setLabels] = useState([]);
	const [dataset, setDataset] = useState([]);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);

	// Helper function to generate past 7 days in dd-mm-yyyy format
	const getPast7Days = () => {
		const days = [];
		for (let i = 6; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const day = date.getDate().toString().padStart(2, "0");
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const year = date.getFullYear();
			days.push(`${day}-${month}-${year}`);
		}
		return days;
	};

	useEffect(() => {
		const getNumOfView = async (listingID) => {
			try {
				const response = await axios.get("/api/seller/listings/views", {
					params: {
						listingID: listingID,
					},
				});
				if (response.status === 200 && response.data.length > 0) {
					setDataframe(response.data);
				} else {
					setError("No data found...");
				}
			} catch (err) {
				setError("Error fetching data...");
			}
		};
		getNumOfView(listingID);
	}, []);

	useEffect(() => {
		if (Array.isArray(dataframe)) {
			const past7Days = getPast7Days();

			// Initialize counts for past 7 days with 0
			const countsByDate = past7Days.reduce((acc, date) => {
				acc[date] = 0;
				return acc;
			}, {});

			// Fill in actual counts from the dataframe
			dataframe.forEach((data) => {
				if (countsByDate.hasOwnProperty(data._id)) {
					countsByDate[data._id] = data.count;
				}
			});

			// Update labels and dataset
			setLabels(past7Days);
			setDataset(past7Days.map((date) => countsByDate[date]));
		}
	}, [dataframe]);

	useEffect(() => {
		if (Array.isArray(dataset) && dataset.length > 0) {
			setMax(Math.max(...dataset) + 3);
			setMin(Math.min(...dataset));
		}
	}, [dataset]);

	const goBack = () => {
		navigate(-1);
	};

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Number of Views",
				data: dataset,
				backgroundColor: "aqua",
				borderColor: "black",
				pointBorderColor: "red",
			},
		],
	};

	const options = {
		plugins: {
			title: {
				display: true,
				text: "Number of Views in Past 7 Days",
				color: "black",
				padding: {
					top: 10,
					bottom: 30,
				},
				font: {
					size: 32,
					weight: "bold",
				},
			},
		},
		scales: {
			y: {
				min: 0,
				max: max,
			},
		},
	};

	return (
		<div className={styles.trackViewsPageContainer}>
			<div className={styles.backButton} onClick={goBack}>
				&lt; Back
			</div>
			<Line data={data} options={options} />
		</div>
	);
};

export default SellerTrackViewsPage;
