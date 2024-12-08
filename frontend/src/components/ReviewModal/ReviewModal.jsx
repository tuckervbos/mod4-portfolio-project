import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";

function ReviewModal({ onSubmit }) {
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);
	const [hoveredStars, setHoveredStars] = useState(0);
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
		closeModal();
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
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							className={`star ${
								star <= (hoveredStars || stars) ? "highlighted" : ""
							}`}
							onMouseEnter={() => setHoveredStars(star)}
							onMouseLeave={() => setHoveredStars(0)}
							onClick={() => setStars(star)}
						>
							★
						</span>
					))}
					<label className="stars-label">Stars</label>
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
