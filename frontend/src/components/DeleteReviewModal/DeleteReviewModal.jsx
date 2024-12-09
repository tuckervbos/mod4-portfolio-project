import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./DeleteReviewModal.css";

const DeleteReviewModal = ({ reviewId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleDelete = async () => {
		await dispatch(deleteReview(reviewId));
		closeModal();
	};

	return (
		<div className="delete-review-modal">
			<h1>Confirm Delete</h1>
			<p>Are you sure you want to delete this review?</p>
			<div className="delete-review-buttons">
				<button className="delete-button" onClick={handleDelete}>
					Yes (Delete Review)
				</button>
				<button className="cancel-button" onClick={closeModal}>
					No (Keep Review)
				</button>
			</div>
		</div>
	);
};

export default DeleteReviewModal;
