import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
	const { id, name, city, state, price, avgRating, previewImage } = spot;

	return (
		<div className="spot-card">
			<Link to={`/spots/${id}`} title={name}>
				<img
					src={previewImage || "/placeholder.jpg"}
					alt={name}
					className="spot-card-image"
				/>
				<div className="spot-card-info">
					<div className="spot-card-location">
						{city}, {state}
					</div>
					<div className="spot-card-rating">
						{avgRating ? `${avgRating} ★` : "New"}
					</div>
				</div>
				<div className="spot-card-price">${price} / night</div>
			</Link>
		</div>
	);
};

export default SpotCard;
