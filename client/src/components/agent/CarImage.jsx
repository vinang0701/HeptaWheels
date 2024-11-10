// CarImage.jsx
import { useState } from "react";

const CarImage = ({ src, alt, fallbackSrc = "./src/assets/blank.jpg" }) => {
	const [isError, setIsError] = useState(false);

	const handleError = () => {
		setIsError(true);
	};

	return (
		<img
			src={isError ? fallbackSrc : src}
			alt={alt}
			onError={handleError}
			style={{ width: "100%", height: "220px" }} // You can adjust the styling as needed
		/>
	);
};

export default CarImage;
