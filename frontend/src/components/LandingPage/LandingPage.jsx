import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./LandingPage.css";

function LandingPage() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const spots = useSelector((state) =>
		Object.values(state.spots.allSpots || {})
	);
	console.log("Spots fetched from Redux:", spots);

	useEffect(() => {
		dispatch(getAllSpots()).then(() => setLoading(false));
	}, [dispatch]);

	if (loading) {
		return <p>Loading spots...</p>;
	}

	return (
		<div className="spots-grid">
			{spots.map((spot) => {
				console.log("Spot data for rendering:", spot.avgRating);
				return (
					<Link to={`/spots/${spot.id}`} key={spot.id} className="spot-card">
						<img
							src={spot.previewImage}
							alt={spot.name}
							className="spot-image"
						/>
						<div className="spot-info">
							<div className="spot-left">
								<div className="spot-location">
									{spot.city}, {spot.state}
								</div>
								<div className="spot-price">${spot.price.toFixed(2)} night</div>
							</div>
							<div className="spot-rating">
								{typeof spot.avgRating === "number" && spot.avgRating >= 0
									? `⭐ ${spot.avgRating.toFixed(1)}`
									: "⭐ No rating yet"}
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default LandingPage;
