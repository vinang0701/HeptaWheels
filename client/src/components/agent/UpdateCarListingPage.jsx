import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import carImage from "../../assets/audi.jpg";
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
	const [uploadedImage, setUploadedImage] = useState({});
	const [image, setImage] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const [sellerID, setSellerID] = useState("");
	const [carPlateNo, setCarPlateNo] = useState("");
	const [carMake, setCarMake] = useState("");
	const [carModel, setCarModel] = useState("");
	const [price, setPrice] = useState("");
	const [status, setStatus] = useState("");
	const [desc, setDesc] = useState("");

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
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

	const toggleDeleteVisibility = (e) => {
		console.log("Hi");
		setDeleteVisible(!isDeleteVisible);
	};

	// Function to handle file selection
	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		setImage("./src/assets/" + file.name);
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
					console.log("listing");
					setSellerID(listing.sellerID);
					setCarPlateNo(listing.carPlateNo);
					setCarMake(listing.carMake);
					setCarModel(listing.carModel);
					setPrice(listing.price);
					setStatus(listing.status);
					setDesc(listing.desc);
					setUploadedImage(listing.image);
					setImage(listing.image);

					// setUploadedImage(listing.image);
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
		if (price <= 0) {
			setError("Please input a valid price.");
			return;
		}

		const carListingObj = {
			sellerID: sellerID,
			carPlateNo: carPlateNo,
			carMake: carMake,
			carModel: carModel,
			price: price,
			desc: desc,
			status: status,
			image: image,
		};

		console.log(carListingObj);

		try {
			// Make a POST request to the API
			const response = await axios.put(
				`/api/agent/listings/${listingID}`,
				carListingObj
			);

			if (response.data.status === "success") {
				alert("Listing successfully updated!");
				setTimeout(() => {
					navigate("/agent"), 2000;
				});
			} else {
				setError(response.data.message);
			}
		} catch (err) {
			// Handle error
			setError("Update unsuccessful!");
			console.log(error);
		}
	};
	return (
		<div className="pageContainer">
			<p onClick={handleGoBack} className="backButton">
				&lt; Back
			</p>
			<form className={styles.uploadListingForm} onSubmit={handleSubmit}>
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
						<label>Seller ID</label>
						<input
							type="text"
							pattern="\d+"
							value={sellerID}
							onChange={sellerIDInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label>Car Plate No.</label>
						<input
							type="text"
							value={carPlateNo}
							onChange={(e) => setCarPlateNo(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label>Car Make</label>
						<input
							type="text"
							value={carMake}
							onChange={(e) => setCarMake(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label>Car Model</label>
						<input
							type="text"
							value={carModel}
							onChange={(e) => setCarModel(e.target.value)}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label>Price</label>
						<input
							type="text"
							value={price}
							pattern="^[1-9]\d*$"
							onChange={priceInputChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.inputContainer}>
						<label>Status</label>
						<select
							name="status"
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="Available">Available</option>
							<option value="Unavailable">Unavailable</option>
							<option value="Pending">Pending</option>
							<option value="Sold">Sold</option>
						</select>
					</div>
					<div className={styles.textAreaContainer}>
						<label>Description (optional)</label>
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
						<button type="submit">Update</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateCarListingPage;
