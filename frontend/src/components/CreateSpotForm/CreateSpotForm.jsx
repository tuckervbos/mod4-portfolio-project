import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpot, addSpotImages } from "../../store/spots";
import { useDispatch } from "react-redux";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const spotData = {
			address,
			city,
			state,
			country,
			lat: lat ? parseFloat(lat) : null,
			lng: lng ? parseFloat(lng) : null,
			name,
			description,
			price: parseFloat(price),
			previewImage,
			imageUrls: imageUrls.filter((url) => url.trim() !== ""),
		};

		try {
			const newErrors = {};

			if (!country) newErrors.country = "Country is required";
			if (!address) newErrors.address = "Street Address is required";
			if (!city) newErrors.city = "City is required";
			if (!state) newErrors.state = "State is required";
			if (description.length < 30)
				newErrors.description = "Description needs a minimum of 30 characters";
			if (!name) newErrors.name = "Name is required";
			if (!price) newErrors.price = "Price is required";
			if (!previewImage)
				newErrors.previewImageRequired = "Preview image is required";
			imageUrls.forEach((url, idx) => {
				if (url && !/^https?:\/\/.+/.test(url)) {
					newErrors[`image${idx + 1}`] = `Image URL ${
						idx + 1
					} must be a valid URL starting with http or https.`;
				}
			});

			if (Object.keys(newErrors).length) {
				setErrors(newErrors);
				return;
			}

			const newSpot = await dispatch(createSpot(spotData));

			await dispatch(
				addSpotImages(newSpot.id, [
					{ url: previewImage, preview: true },
					...imageUrls.filter(Boolean).map((url) => ({ url, preview: false })),
				])
			);

			navigate(`/spots/${newSpot.id}`);
		} catch (err) {
			console.error("Failed to create spot:", err);
			setErrors({ general: "Something went wrong. Please try again." });
		}
	};

	return (
		<div className="create-spot-form-container">
			<form className="create-spot-form" onSubmit={handleSubmit}>
				<h2>Create a New Spot</h2>
				{errors.general && <p className="error">{errors.general}</p>}

				<fieldset>
					<legend>Where&apos;s your place located?</legend>
					<p className="description">
						Guests will only get your exact address once they booked a
						reservation.
					</p>

					<label htmlFor="country">
						Country
						{errors.country && <p className="error">{errors.country}</p>}
					</label>

					<input
						id="country"
						type="text"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>

					<label htmlFor="address">
						Street Address
						{errors.address && <p className="error">{errors.address}</p>}
					</label>
					<input
						id="address"
						type="text"
						placeholder="Street Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>

					<div className="city-state">
						<div>
							<label htmlFor="city">
								City {errors.city && <p className="error">{errors.city}</p>}
							</label>
							<input
								id="city"
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="state">
								State {errors.state && <p className="error">{errors.state}</p>}
							</label>
							<input
								id="state"
								type="text"
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
							/>
						</div>
					</div>

					<div className="lat-lng">
						<div>
							<label htmlFor="lat">Latitude</label>
							<input
								id="lat"
								type="text"
								placeholder="Latitude"
								value={lat}
								onChange={(e) => setLat(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="lng">Longitude</label>
							<input
								id="lng"
								type="text"
								placeholder="Longitude"
								value={lng}
								onChange={(e) => setLng(e.target.value)}
							/>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>Describe your place to guests</legend>
					<p className="description">
						Mention the best features of your space, any special amentities like
						fast wifi or parking, and what you love about the neighborhood.
					</p>
					<textarea
						placeholder="Please write at least 30 characters"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					{errors.description && <p className="error">{errors.description}</p>}
				</fieldset>

				<fieldset>
					<legend>Create a title for your spot</legend>
					<p className="description">
						Catch guests&apos; attention with a spot tile that highlights what
						makes your place special.
					</p>
					<input
						type="text"
						placeholder="Name of your spot"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{errors.name && <p className="error">{errors.name}</p>}
				</fieldset>

				<fieldset>
					<legend>Set a base price for your spot</legend>
					<p className="description">
						Competitive pricing can help your listing stand out and rank higher
						in search results.
					</p>
					<input
						type="number"
						placeholder="Price per night (USD)"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					{errors.price && <p className="error">{errors.price}</p>}
				</fieldset>

				<fieldset>
					<legend>Liven up your spot with photos</legend>
					<p className="description">
						Submit a link to at least one photo to publish your spot.
					</p>
					<input
						type="text"
						placeholder="Preview Image URL"
						value={previewImage}
						onChange={(e) => setPreviewImage(e.target.value)}
					/>
					{errors.previewImageRequired && (
						<p className="error">{errors.previewImageRequired}</p>
					)}
					{errors.previewImageFormat && (
						<p className="error">{errors.previewImageFormat}</p>
					)}

					{imageUrls.map((url, idx) => (
						<div key={idx}>
							<input
								type="text"
								placeholder={`Image URL`}
								value={url}
								onChange={(e) => {
									const newUrls = [...imageUrls];
									newUrls[idx] = e.target.value;
									setImageUrls(newUrls);
								}}
							/>
							{errors[`image${idx + 1}`] && (
								<p className="error">{errors[`image${idx + 1}`]}</p>
							)}
						</div>
					))}
				</fieldset>

				<button type="submit" className="create-spot-form-button">
					Create Spot
				</button>
			</form>
		</div>
	);
};

export default CreateSpotForm;
