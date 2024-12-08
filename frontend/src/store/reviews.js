import { csrfFetch } from "./csrf";
// import { createSelector } from "reselect";

//> action types:
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const CLEAR_SPOT_REVIEWS = "reviews/CLEAR_SPOT_REVIEWS";

//> action creators
const loadReviews = (reviews) => ({
	type: LOAD_REVIEWS,
	reviews,
});

const addReviewAction = (review) => ({
	type: ADD_REVIEW,
	review,
});

const updateReviewAction = (review) => ({
	type: UPDATE_REVIEW,
	review,
});

const removeReview = (reviewId) => ({
	type: REMOVE_REVIEW,
	reviewId,
});

export const clearSpotReviews = () => ({
	type: CLEAR_SPOT_REVIEWS,
});

//- thunks
export const fetchSpotReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
	if (res.ok) {
		const data = await res.json();
		console.log("API Response for spot reviews:", data); // Add this
		dispatch(loadReviews(data.Reviews));
	}
};

export const addReview = (spotId, review) => async (dispatch) => {
	console.log("Review payload before conversion:", review);
	const reviewPayload = { ...review, stars: parseInt(review.stars, 10) };
	console.log("Review payload after conversion:", reviewPayload);

	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(reviewPayload),
	});
	if (res.ok) {
		const newReview = await res.json();
		dispatch(addReviewAction(newReview));
	}
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(reviewData),
	});

	if (res.ok) {
		const updatedReview = await res.json();
		dispatch(updateReviewAction(updatedReview));
		return updatedReview;
	}
};

export const deleteReview = (reviewId) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
	if (res.ok) {
		dispatch(removeReview(reviewId));
	}
};

//* reducer:
const initialState = { spotReviews: {} };

export default function reviewsReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_REVIEWS: {
			console.log("Reducer LOAD_REVIEWS action payload:", action.reviews);
			if (!action.reviews) {
				console.error("No reviews found in action payload");
				return state;
			}
			const newReviews = {};
			action.reviews
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort reviews by date (newest first)
				.forEach((review) => {
					newReviews[review.id] = review;
				});
			return { ...state, spotReviews: newReviews };
		}
		case ADD_REVIEW:
			return {
				...state,
				spotReviews: {
					...state.spotReviews,
					[action.review.id]: action.review,
				},
			};
		case REMOVE_REVIEW: {
			const newState = { ...state, spotReviews: { ...state.spotReviews } };
			delete newState.spotReviews[action.reviewId];
			return newState;
		}
		case UPDATE_REVIEW:
			return {
				...state,
				spotReviews: {
					...state.spotReviews,
					[action.review.id]: action.review,
				},
			};
		case CLEAR_SPOT_REVIEWS:
			return { ...state, spotReviews: {} };
		default:
			return state;
	}
}
