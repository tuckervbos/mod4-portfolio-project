import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSpotById, updateSpot } from "../../store/spots";
import "./UpdateSpotForm.css";

const UpdateSpotForm = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const spot = useSelector((state) => state.spots[id]);

	useEffect(() => {
		dispatch(getSpotById(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (spot) {
			setName(spot.name);
			setAddress(spot.address);
			setCity(spot.city);
			setState(spot.state);
			setCountry(spot.country);
			setLat(spot.lat || "");
			setLng(spot.lng || "");
			setDescription(spot.description);
			setPrice(spot.price.toString());
			setPreviewImage(spot.previewImage || "");
			setImageUrls(spot.images?.map((img) => img.url) || ["", "", "", ""]);
		}
	}, [spot]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const updatedSpotData = {
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

			if (Object.keys(newErrors).length) {
				setErrors(newErrors);
				return;
			}

			await dispatch(updateSpot(id, updatedSpotData));
			navigate(`/spots/${id}`);
		} catch (err) {
			console.error("Failed to update spot:", err);
			setErrors({ general: "Something went wrong. Please try again." });
		}
	};

	return (
		<div className="update-spot-form-container">
			<form className="update-spot-form" onSubmit={handleSubmit}>
				<h2>Update your Spot</h2>
				{errors.general && <p className="error">{errors.general}</p>}

				<fieldset>
					<legend>Where&apos;s your place located?</legend>
					<p className="description">
						Guests will only get your exact address once they booked a
						reservation.
					</p>

					<label htmlFor="country">Country</label>
					<input
						id="country"
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
					{errors.country && <p className="error">{errors.country}</p>}

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

				<button type="submit">Update your Spot</button>
			</form>
		</div>
	);
};

export default UpdateSpotForm;
