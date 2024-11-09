import { useState, useEffect, useRef } from "react";
import { useAsyncValue, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./CreateCarListingPage.module.css";

const CreateCarListingPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const { auth } = useAuth();
	const agentID = auth.userID;
	const fileInputRef = useRef(null);
	const [uploadedImage, setUploadedImage] = useState({});
	const [image, setImage] = useState("");
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

	const sellerIDInputChange = (e) => {
		const value = e.target.value;
		// Allow only digits by replacing non-digit characters
		if (/^\d*$/.test(value)) {
			setSellerID(value); // Update the state if the value is a valid number
		}
	};

	const priceInputChange = (e) => {
		const value = e.target.value;
		// Allow only digits by replacing non-digit characters
		if (/^\d*$/.test(value)) {
			setPrice(value); // Update the state if the value is a valid number
		}
	};

	// Function to handle file selection
	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		http: setImage("localhost:5000/src/assets/" + file.name);
		if (file) {
			const newImage = URL.createObjectURL(file); // Create a URL for the uploaded file
			setUploadedImage(newImage);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (price <= 0) {
			setError("Please input a valid price.");
			return;
		}

		const data = {
			agentID: agentID,
			sellerID: sellerID,
			carPlateNo: carPlateNo,
			carMake: carMake,
			carModel: carModel,
			price: price,
			desc: desc,
			status: "Available",
			image: image,
		};

		console.log(data);

		try {
			// Make a POST request to the API
			const response = await axios.post("/api/agent/listings", data);

			if (response.data.status === "success") {
				alert("Listing Successfully Added!");
				setTimeout(() => {
					navigate("/agent");
				}, 2000);
			} else {
				setError(response.data.message);
			}
		} catch (err) {
			// Handle error
			setError("Listing already exists!");
			console.log(error);
		}
	};

	return (
		<div className="pageContainer">
			<p onClick={handleGoBack} className="backButton">
				&lt; Back
			</p>
			<form className={styles.createListingForm} onSubmit={handleSubmit}>
				<div className={styles.fileContainer}>
					<div className={styles.uploadImageContainer}>
						{Object.keys(uploadedImage).length !== 0 ? (
							<div
								className={styles.selectImage}
								onClick={() => selectImage(uploadedImage)}
							>
								<img src={uploadedImage} alt="Uploaded" />
							</div>
						) : null}
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
							pattern="\d+"
							value={sellerID}
							inputMode="numeric"
							onChange={sellerIDInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Plate No.</p>
						<input
							type="text"
							value={carPlateNo}
							onChange={(e) => setCarPlateNo(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Make</p>
						<input
							type="text"
							value={carMake}
							onChange={(e) => setCarMake(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Car Model</p>
						<input
							type="text"
							value={carModel}
							onChange={(e) => setCarModel(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>Price</p>
						<input
							type="text"
							value={price}
							pattern="^[1-9]\d*$"
							onChange={priceInputChange}
							autoComplete="off"
							required
						/>
					</div>

					<div className={styles.textAreaContainer}>
						<p>Description (optional)</p>
						<textarea
							name="desc"
							id="desc"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							autoComplete="off"
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
