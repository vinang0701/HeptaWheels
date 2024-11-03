import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
	const navigate = useNavigate();
	const goBack = () => navigate("/");
	return (
		<div>
			<div className="unAuthContainer">
				<h1 className="">Unauthorized</h1>
				<br />
				<p>You do not have access to the requested page.</p>
				<div>
					<button className="goHomeButton" onClick={goBack}>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default Unauthorized;
