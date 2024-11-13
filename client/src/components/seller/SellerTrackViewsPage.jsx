import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale, // X-axis
	LinearScale, // y-axis
	PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SellerTrackViewsPage = () => {
	const data = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				labels: "Number of Views",
				data: [3, 6, 9, 2, 4, 5, 2],
				backgroundColor: "aqua",
				borderColor: "black",
				pointBorderColor: "aqua",
				fill: true,
			},
		],
	};

	const options = {
		plugins: {
			legend: true,
		},
		scales: {
			y: {
				min: 0,
				max: 10,
			},
		},
	};
	return (
		<div>
			<Line data={data} options={options} />
		</div>
	);
};

export default SellerTrackViewsPage;
