import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";
import "./SpotList.css";

const SpotList = () => {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.allSpots);
	console.log("Selected spots:", spots);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	if (!spots || Object.keys(spots).length === 0) return <p>Loading spots...</p>;

	return (
		<div className="spot-list">
			{Object.values(spots).map((spot) => (
				<SpotCard key={spot.id} spot={spot} />
			))}
		</div>
	);
};

export default SpotList;
