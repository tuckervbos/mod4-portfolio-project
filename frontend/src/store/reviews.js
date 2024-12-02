import { csrfFetch } from "./csrf";

//> action types:
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

//> action creators
const loadReviews = (reviews) => ({
	type: LOAD_REVIEWS,
	reviews,
});

const addReview = (review) => ({
	type: ADD_REVIEW,
	review,
});

const removeReview = (reviewId) => ({
	type: REMOVE_REVIEW,
	reviewId,
});

//- thunks
export const fetchSpotReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
	if (res.ok) {
		const reviews = await res.json();
		dispatch(loadReviews(reviews));
	}
};

export const createReview = (spotId, review) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(review),
	});
	if (res.ok) {
		const newReview = await res.json();
		dispatch(addReview(newReview));
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
		case REMOVE_REVIEW:
			const newState = { ...state };
			delete newState.spotReviews[action.reviewId];
			return newState;
		default:
			return state;
	}
}
