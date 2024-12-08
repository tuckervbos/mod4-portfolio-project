import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserSpots, deleteSpot } from "../../store/spots";
import "./ManageSpots.css";

const ManageSpots = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const spots = useSelector((state) => state.spots.userSpots || []);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (user) {
			dispatch(fetchUserSpots());
		}
	}, [dispatch, user]);

	const handleDelete = async (spotId) => {
		if (window.confirm("Are you sure you want to delete this spot?")) {
			await dispatch(deleteSpot(spotId));
			dispatch(fetchUserSpots());
		}
	};

	if (!spots || spots.length === 0) {
		return (
			<div className="manage-spots">
				<h1 className="manage-spots-h1">Manage Spots</h1>
				<p>You currently have no spots listed.</p>
				<NavLink to="/spots/new" className="create-new-spot-link">
					Create a New Spot
				</NavLink>
			</div>
		);
	}

	return (
		<div className="manage-spots">
			<h1>Manage Spots</h1>
			<div className="spots-list">
				{spots.map((spot) => (
					<div
						key={spot.id}
						className="spot-tile"
						onClick={() => navigate(`/spots/${spot.id}`)}
					>
						<img
							src={spot.previewImage || "/placeholder.jpg"}
							alt={spot.name}
							className="spot-thumbnail"
						/>
						<div className="spot-info">
							<p className="spot-location">
								{spot.city}, {spot.state}
							</p>
							<p className="spot-rating">
								⭐ {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
							</p>
							<p className="spot-price">${spot.price} / night</p>
						</div>
						<div className="spot-actions">
							<button
								className="update-button"
								onClick={(e) => {
									e.stopPropagation();
									navigate(`/spots/${spot.id}/edit`);
								}}
							>
								Update
							</button>
							<button
								className="delete-button"
								onClick={(e) => {
									e.stopPropagation();
									handleDelete(spot.id);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageSpots;
