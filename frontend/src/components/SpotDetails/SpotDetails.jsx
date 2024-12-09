import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/SpotReviews";
import { useModal } from "../../context/Modal";
import ReviewModal from "../ReviewModal/ReviewModal";
import { addReview } from "../../store/reviews";

const SpotDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);
	const user = useSelector((state) => state.session.user);
	const reviews = useSelector((state) =>
		Object.values(state.reviews.spotReviews || {})
	);
	const { setModalContent } = useModal();

	useEffect(() => {
		dispatch(getSpotDetails(id));
	}, [dispatch, id, reviews.length]);

	if (!spot || (!spot.previewImage && !spot.SpotImages))
		return <p className="loading">Loading spot details...</p>;

	const primaryImage =
		spot.previewImage || spot.SpotImages?.[0]?.url || "/placeholder.jpg";
	const secondaryImages = spot.SpotImages?.slice(1, 5) || [];
	const avgRating =
		typeof spot.avgRating === "number" && spot.avgRating >= 0
			? `${spot.avgRating.toFixed(1)}`
			: "New";
	const reviewCount = spot.numReviews || 0;
	const isUserSpot = user && spot.Owner && user.id === spot.Owner.id;

	const hasUserPostedReview = reviews.some(
		(review) => review.userId === user?.id
	);

	const handlePostReviewClick = () => {
		setModalContent(
			<ReviewModal
				spotId={id}
				onSubmit={(newReview) => {
					dispatch(addReview(id, newReview));
					dispatch(getSpotDetails(id));
					// Add logic to update reviews and re-fetch details if necessary
				}}
			/>
		);
	};

	return (
		<div className="spot-details">
			<h1 className="spot-title">{spot.name}</h1>
			<p className="spot-location">
				{spot.city}, {spot.state}, {spot.country}
			</p>

			<div className="spot-images">
				<div className="primary-image">
					<img
						src={primaryImage}
						alt={`${spot.name} primary`}
						className="spot-image preview-image"
					/>
				</div>

				<div className="secondary-images">
					{secondaryImages.map((image) => (
						<img
							key={image.id}
							src={image.url}
							alt={`${spot.name} image`}
							className="spot-image"
						/>
					))}
				</div>
			</div>

			<div className="content-container">
				<div className="description-container">
					<div className="hosted-by">
						<h2>
							Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
						</h2>
					</div>
					<div className="spot-description">
						<p>{spot.description}</p>
					</div>
				</div>

				<div className="price-box">
					<div className="price-and-reviews">
						<div className="price">
							<strong>${spot.price.toFixed(2)}</strong> / night
						</div>
						<div className="rating">
							⭐ {avgRating}
							{reviewCount > 0 && (
								<>
									{" · "}
									{reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
								</>
							)}
						</div>
					</div>
					<button
						className="reserve-button"
						onClick={() => alert("New feature coming soon")}
					>
						Reserve
					</button>
				</div>
			</div>

			<div className="reviews-container">
				<h2 className="reviews-title">
					⭐ {avgRating}
					{reviewCount > 0 && (
						<>
							{" · "}
							{reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
						</>
					)}
				</h2>
				{!isUserSpot && !hasUserPostedReview && user && (
					<button
						className="post-review-button"
						onClick={handlePostReviewClick}
					>
						Post Your Review
					</button>
				)}
				{reviewCount === 0 ? (
					!isUserSpot ? (
						<p className="no-reviews">Be the first to post a review!</p>
					) : (
						<p className="no-reviews">No reviews yet.</p>
					)
				) : (
					<SpotReviews spotId={id} />
				)}
			</div>
		</div>
	);
};

export default SpotDetails;
