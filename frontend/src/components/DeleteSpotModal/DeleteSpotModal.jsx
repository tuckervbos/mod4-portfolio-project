import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import "./DeleteSpotModal.css";

const DeleteSpotModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleDelete = async () => {
		console.log("Delete button clicked for spot:", spotId);
		await dispatch(deleteSpot(spotId));
		// if (onSuccess) onSuccess();
		closeModal();
	};

	return (
		<div className="delete-spot-modal">
			<h1>Confirm Delete</h1>
			<p>Are you sure you want to remove this spot?</p>
			<div className="delete-spot-buttons">
				<button className="delete-button" onClick={handleDelete}>
					Yes (Delete Spot)
				</button>
				<button className="cancel-button" onClick={closeModal}>
					No (Keep Spot)
				</button>
			</div>
		</div>
	);
};

export default DeleteSpotModal;
