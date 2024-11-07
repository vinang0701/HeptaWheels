import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./CreateCarListingPage.module.css";

const CreateCarListingPage = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [images, setImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState("");
	const [sellerID, setSellerID] = useState("");
	const [carPlateNo, setCarPlateNo] = useState("");
	const [carMake, setCarMake] = useState("");
	const [carModel, setCarModel] = useState("");
	const [price, setPrice] = useState("");
	const [desc, setDesc] = useState("");

	const handleGoBack = () => {
		navigate("/agent");
	};

	// Function to handle file selection
	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		setImages((prevImages) => [...images, file]);
		if (file) {
			const newImage = URL.createObjectURL(file); // Create a URL for the uploaded file
			setUploadedImages((prevImages) => [...prevImages, newImage]); // Add new image URL to state
		}
	};

	// Function to trigger the file input click
	const triggerFileSelect = () => {
		fileInputRef.current.click();
	};

	const selectImage = (image) => {
		setSelectedImage(image);
		console.log(image);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(images);
		console.log(sellerID);
		console.log(carPlateNo);
		console.log(carMake);
		console.log(carModel);
		console.log(price);
		console.log(desc);
	};

	return (
		<div className="pageContainer">
			<p onClick={handleGoBack} className="backButton">
				&lt; Back
			</p>
			<form className={styles.createListingForm} onSubmit={handleSubmit}>
				<div className={styles.fileContainer}>
					<div className={styles.uploadImageContainer}>
						{uploadedImages.map((image, index) => (
							<div
								key={index}
								className={styles.selectImage}
								onClick={() => {
									selectImage(image);
								}}
							>
								<img
									src={image}
									alt={`Uploaded ${index + 1}`}
								/>
							</div>
						))}

						<div
							className={styles.uploadImage}
							onClick={triggerFileSelect}
						>
							<p>Upload file</p>
							<input
								type="file"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
						</div>
					</div>
					<div className={styles.selectedImage}>
						{selectedImage ? (
							<img src={selectedImage} alt="Selected" />
						) : null}
					</div>
				</div>
				<div className={styles.listingDetails}>
					<div className={styles.inputContainer}>
						<p>Seller ID</p>
						<input
							type="text"
							value={sellerID}
							onChange={(e) => setSellerID(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Plate No.</p>
						<input
							type="text"
							value={carPlateNo}
							onChange={(e) => setCarPlateNo(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Make</p>
						<input
							type="text"
							value={carMake}
							onChange={(e) => setCarMake(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Model</p>
						<input
							type="text"
							value={carModel}
							onChange={(e) => setCarModel(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Price</p>
						<input
							type="text"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div className={styles.textAreaContainer}>
						<p>Description (optional)</p>
						<textarea
							name="desc"
							id="desc"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</div>
					<div className={styles.buttonContainer}>
						<button
							type="button"
							onClick={handleGoBack}
							className="cancelButton"
						>
							Cancel
						</button>
						<button type="submit">Create</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateCarListingPage;
