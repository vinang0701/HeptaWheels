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
import { useParams } from "react-router-dom";
import styles from "./TrackShortlistPage.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const TrackShortlistPage = () => {
	const { listingID } = useParams();
	const [error, setError] = useState("");
	const [dataframe, setDataframe] = useState([]);
	const [labels, setLabels] = useState([]);
	const [dataset, setDataset] = useState([]);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);

	useEffect(() => {
		const viewShortlistNumber = async (listingID) => {
			try {
				const response = await axios.get(
					"/api/seller/listings/shortlist",
					{
						params: {
							listingID: listingID,
						},
					}
				);
				if (response.status === 200 && response.data.length > 0) {
					setDataframe(response.data);
				} else {
					setError("No data found...");
				}
			} catch (err) {
				setError("Error fetching data...");
			}
		};
		viewShortlistNumber(listingID);
	}, []);

	useEffect(() => {
		// Check if dataframe exists and is an array before mapping
		if (Array.isArray(dataframe)) {
			const newLabels = dataframe.map((data) => data._id);
			const newDataset = dataframe.map((data) => data.count);

			setLabels(newLabels);
			setDataset(newDataset);
		}
	}, [dataframe]);

	useEffect(() => {
		if (Array.isArray(dataset) && dataset.length > 0) {
			setMax(Math.max(...dataset) + 3);
			setMin(Math.min(...dataset));
		}
	}, [dataset]);

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Number of Shortlists",
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
				text: "Number of Shortlists in Past 7 Days",
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

	if (dataframe.length === 0) {
		return (
			<div className={styles.trackShortlistPageContainer}>
				Nothing to see
			</div>
		);
	}
	return (
		<div className={styles.trackShortlistPageContainer}>
			<Line data={data} options={options} />
		</div>
	);
};

export default TrackShortlistPage;
