import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/SpotReviews";

const SpotDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);

	useEffect(() => {
		dispatch(getSpotDetails(id));
	}, [dispatch, id]);

	if (!spot || (!spot.previewImage && !spot.SpotImages))
		return <p className="loading">Loading spot details...</p>;

	const primaryImage =
		spot.previewImage || spot.SpotImages?.[0]?.url || "/placeholder.jpg";

	const secondaryImages = spot.SpotImages?.slice(1, 5) || [];

	return (
		<div className="spot-details">
			{/* spot title/location */}
			<h1 className="spot-title">{spot.name}</h1>
			<p className="spot-location">
				{spot.city}, {spot.state}, {spot.country}
			</p>

			{/* images */}
			<div className="spot-images">
				{/* primary image */}
				<div className="primary-image">
					<img
						src={primaryImage}
						alt={spot.name}
						className="spot-image preview-image"
					/>
				</div>

				{/* secondary images */}
				<div className="secondary-images">
					{secondaryImages.map((image) => (
						<img
							key={image.id}
							src={image.url}
							alt={`${spot.name} image`}
							className="spot-image"
						/>
					))}
				</div>
			</div>

			{/* Content Layout */}
			<div className="content-container">
				{/* Hosted By and Description */}
				<div className="description-container">
					<div className="hosted-by">
						<h2>
							Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
						</h2>
					</div>
					<div className="spot-description">
						<p>{spot.description}</p>
					</div>
				</div>

				{/* Price and Reserve Box */}
				<div className="price-box">
					<div className="price">
						<strong>${spot.price}</strong> / night
					</div>
					<div className="rating">
						⭐ {spot.avgRating || "No rating yet"} ({spot.numReviews || 0}{" "}
						reviews)
					</div>
					<button
						className="reserve-button"
						onClick={() => alert("New feature coming soon")}
					>
						Reserve
					</button>
				</div>
			</div>

			{/* reviews */}
			<SpotReviews spotId={id} />
		</div>
	);
};

export default SpotDetails;
