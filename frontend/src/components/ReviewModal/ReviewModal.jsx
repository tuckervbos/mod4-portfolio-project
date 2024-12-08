import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";

function ReviewModal({ onSubmit }) {
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);
	const [errors, setErrors] = useState({});

	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};
		if (reviewText.length < 10)
			newErrors.reviewText = "Review must be at least 10 characters.";
		if (stars < 1 || stars > 5)
			newErrors.stars = "Rating must be between 1 and 5.";
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		onSubmit({ review: reviewText, stars });
		setReviewText("");
		setStars(0);
		setErrors({});
		closeModal(); // Close modal after submission
	};

	return (
		<div className="review-form-container">
			<h1>How was your stay?</h1>
			{errors.general && <p className="error-message">{errors.general}</p>}
			<form onSubmit={handleSubmit}>
				<textarea
					value={reviewText}
					onChange={(e) => setReviewText(e.target.value)}
					placeholder="Leave your review here..."
					required
				/>
				{errors.reviewText && (
					<p className="error-message">{errors.reviewText}</p>
				)}
				<div className="stars-container">
					<input
						type="number"
						value={stars}
						onChange={(e) => setStars(Number(e.target.value))}
						min="1"
						max="5"
					/>
					<label>Stars</label>
				</div>
				{errors.stars && <p className="error-message">{errors.stars}</p>}
				<button type="submit" disabled={reviewText.length < 10 || stars < 1}>
					Submit Your Review
				</button>
			</form>
		</div>
	);
}

export default ReviewModal;
