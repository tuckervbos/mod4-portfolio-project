import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchSpotReviews,
	clearSpotReviews,
	// updateReview,
} from "../../store/reviews";
import { useModal } from "../../context/Modal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import "./SpotReviews.css";

const SpotReviews = () => {
	const { id: spotId } = useParams();
	const dispatch = useDispatch();
	const { setModalContent } = useModal();

	const reviews = useSelector(
		(state) =>
			Object.values(state.reviews.spotReviews).filter((review) => review.User) // Ensure only valid reviews
	);
	const sessionUser = useSelector((state) => state.session.user);
	const spot = useSelector((state) => state.spots[spotId]);
	// const [isEditing, setIsEditing] = useState(false);
	// const [editingReviewId, setEditingReviewId] = useState(null);

	useEffect(() => {
		if (spotId) {
			dispatch(fetchSpotReviews(spotId));
		}
		return () => dispatch(clearSpotReviews({ spotId }));
	}, [dispatch, spotId]);

	const sortedReviews = [...reviews].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	// const handleUpdate = (review) => {
	// 	setReviewText(review.review);
	// 	setStars(review.stars);
	// 	setIsEditing(true);
	// 	setEditingReviewId(review.id);
	// };

	const handleDeleteReviewClick = (reviewId) => {
		setModalContent(<DeleteReviewModal reviewId={reviewId} />);
	};

	return (
		<div className="spot-reviews">
			<h2>Reviews</h2>

			{reviews.length === 0 ? (
				!sessionUser || spot?.userId === sessionUser.id ? (
					<p className="no-reviews">No reviews yet.</p>
				) : (
					<p className="no-reviews">Be the first to post a review!</p>
				)
			) : (
				sortedReviews.map((review) => {
					const formattedDate = new Intl.DateTimeFormat("en-US", {
						month: "long",
						year: "numeric",
					}).format(new Date(review.createdAt));

					return (
						<div key={review.id} className="review">
							<p>
								<strong>{review.User?.firstName || "Anonymous"}</strong> -{" "}
								<span className="review-date">{formattedDate}</span>
							</p>
							<p>{review.review}</p>
							<p>Rating: {review.stars} ⭐</p>
							{sessionUser?.id === review.userId && (
								<div className="review-buttons">
									<button
										className="edit-review-button"
										// onClick={() => ("edit logic")}
									>
										Edit
									</button>
									<button
										className="delete-review-button"
										onClick={() => handleDeleteReviewClick(review.id)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					);
				})
			)}
		</div>
	);
};

export default SpotReviews;
