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

	if (!spot) return <p>Loading spot details...</p>;

	return (
		<div className="spot-details">
			<h1>{spot.name}</h1>
			<p>
				{spot.city}, {spot.state}, {spot.country}
			</p>
			<img
				src={spot.previewImage || "/placeholder.jpg"}
				alt={spot.name}
				className="spot-details-image"
			/>
			<p>{spot.description}</p>
			<p>
				<strong>${spot.price}</strong> / night
			</p>
			<SpotReviews spotId={id} />
		</div>
	);
};

export default SpotDetails;
