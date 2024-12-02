import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchSpotReviews,
	createReview,
	deleteReview,
} from "../../store/reviews";

const SpotReviews = () => {
	const { id: spotId } = useParams();
	const dispatch = useDispatch();
	const reviews = useSelector((state) =>
		Object.values(state.reviews.spotReviews)
	);
	const sessionUser = useSelector((state) => state.session.user);
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);

	useEffect(() => {
		dispatch(fetchSpotReviews(spotId));
	}, [dispatch, spotId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (reviewText.length < 10 || stars < 1) {
			alert("Please provide at least 10 characters and a rating.");
			return;
		}
		await dispatch(createReview(spotId, { review: reviewText, stars }));
		setReviewText("");
		setStars(0);
	};

	const handleDelete = (reviewId) => {
		dispatch(deleteReview(reviewId));
	};

	return (
		<div className="spot-reviews">
			<h2>Reviews</h2>
			{reviews.length === 0 ? (
				<p>No reviews yet, be the first to review!</p>
			) : (
				reviews.map((review) => (
					<div key={review.id} className="review">
						<p>
							<strong>{review.User?.firstName}</strong>: {review.review}
						</p>
						<p>Rating: {review.stars} ⭐</p>
						{sessionUser?.id === review.userId && (
							<button onClick={() => handleDelete(review.id)}>Delete</button>
						)}
					</div>
				))
			)}

			{sessionUser && (
				<form onSubmit={handleSubmit}>
					<textarea
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
						placeholder="Leave your review here..."
					/>
					<input
						type="number"
						value={stars}
						onChange={(e) => setStars(e.target.value)}
						min="1"
						max="5"
						placeholder="Rating (1-5)"
					/>
					<button type="submit">Submit Review</button>
				</form>
			)}
		</div>
	);
};

export default SpotReviews;
