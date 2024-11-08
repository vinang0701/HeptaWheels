import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import styles from "./UpdateCarListingPage.module.css";

const UpdateCarListingPage = () => {
	const { listingID } = useParams(); // Retrieve car ID from the URL
	const navigate = useNavigate();
	const [listing, setListing] = useState({});
	const [error, setError] = useState("");
	const [isDeleteVisible, setDeleteVisible] = useState(false);
	const { auth } = useAuth();
	const agentID = auth.userID;
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
		navigate(-1); // Go back to the previous page
	};

	const toggleDeleteVisibility = (e) => {
		console.log("Hi");
		setDeleteVisible(!isDeleteVisible);
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
	};

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const response = await axios.get(
					`/api/agent/listings/details/${listingID}`
				);
				var listing = response.data.listing;
				setListing(listing);
				if (listing) {
					set;
				}
			} catch (err) {
				setError("Error fetching data");
				console.error(err);
			}
		};
		fetchListing(); // Call the fetch function
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			agentID: agentID,
			sellerID: sellerID,
			carPlateNo: carPlateNo,
			carMake: carMake,
			carModel: carModel,
			price: price,
			desc: desc,
			status: "Available",
			image: images,
		};

		console.log(data);

		try {
			// Make a POST request to the API
			const response = await axios.post("/api/agent/listings", data);

			if (response.data.status === "success") {
				alert("Listing Successfully Added!");
				window.location.reload();
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
							pattern="\d+"
							value={sellerID}
							onChange={(e) => setSellerID(e.target.value)}
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
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							min="0"
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

export default UpdateCarListingPage;
