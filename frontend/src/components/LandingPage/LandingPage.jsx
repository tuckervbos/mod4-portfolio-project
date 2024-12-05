import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./LandingPage.css";

function LandingPage() {
	const dispatch = useDispatch();
	const spots = useSelector((state) =>
		Object.values(state.spots.allSpots || {})
	);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	return (
		<div className="landing-page">
			<div className="spots-grid">
				{spots.map((spot) => (
					<NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-tile">
						<img src={spot.previewImage} alt={`${spot.name}`} />
						<div className="spot-info">
							<p>
								{spot.city}, {spot.state}
							</p>
							<p>${spot.price}/night</p>
						</div>
					</NavLink>
				))}
			</div>
		</div>
	);
}

export default LandingPage;
