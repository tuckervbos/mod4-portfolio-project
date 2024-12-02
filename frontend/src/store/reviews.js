import { csrfFetch } from "./csrf";
// import { createSelector } from "reselect";

//> action types:
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";

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

// //= selector:
// export const selectSpotReviews = createSelector(
// 	(state) => state.reviews.spotReviews,
// 	(spotReviews) => Object.values(spotReviews)
// );

//- thunks
export const fetchSpotReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
	if (res.ok) {
		const data = await res.json();
		dispatch(loadReviews(data.reviews));
	}
};

export const addReview = (spotId, review) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(review),
	});
	if (res.ok) {
		const newReview = await res.json();
		dispatch(addReviewAction(newReview));
	}
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "PUT",
		body: JSON.stringify(reviewData),
	});

	if (res.ok) {
		const updatedReview = await res.json();
		dispatch(updateReviewAction(updatedReview));
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
		case LOAD_REVIEWS:
			return { ...state, spotReviews: { ...action.reviews } };
		case ADD_REVIEW:
			return {
				...state,
				spotReviews: {
					...state.spotReviews,
					[action.review.id]: action.review,
				},
			};
		case REMOVE_REVIEW: {
			const newState = { ...state };
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
		default:
			return state;
	}
}
