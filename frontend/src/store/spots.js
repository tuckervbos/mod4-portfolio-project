import { csrfFetch } from "./csrf";

//> action types:
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_SPOT = "spots/LOAD_SPOT";
const ADD_SPOT = "spots/ADD_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";
const LOAD_SINGLE_SPOT = "spots/LOAD_SINGLE_SPOT";

//> action creators:
const loadSpots = (spots) => ({
	type: LOAD_SPOTS,
	spots,
});

const loadSpot = (spot) => ({
	type: LOAD_SPOT,
	spot,
});

const addSpot = (spot) => ({
	type: ADD_SPOT,
	spot,
});

const setUpdatedSpot = (spot) => ({
	type: UPDATE_SPOT,
	spot,
});

const removeSpot = (spotId) => ({
	type: REMOVE_SPOT,
	spotId,
});

const loadSingleSpot = (spot) => ({
	type: LOAD_SINGLE_SPOT,
	spot,
});

//- thunks:
export const getAllSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots");
	if (res.ok) {
		const data = await res.json();
		console.log("Fetched spots:", data.Spots); // Log fetched data
		dispatch(loadSpots(data.Spots));
	}
};

export const getSpotById = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`);
	if (res.ok) {
		const spot = await res.json();
		dispatch(loadSpot(spot));
	}
};

export const createSpot = (spotData) => async (dispatch) => {
	const res = await csrfFetch("/api/spots", {
		method: "POST",
		body: JSON.stringify(spotData),
	});
	if (res.ok) {
		const newSpot = await res.json();
		dispatch(addSpot(newSpot));
		return newSpot;
	}
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: "PUT",
		body: JSON.stringify(spotData),
	});
	if (res.ok) {
		const updatedSpot = await res.json();
		dispatch(setUpdatedSpot(updatedSpot));
		return updatedSpot;
	}
};

export const deleteSpot = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(removeSpot(spotId));
	}
};

export const getSpotDetails = (id) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${id}`);
	if (res.ok) {
		const data = await res.json();
		dispatch(loadSingleSpot(data));
	}
};

//* reducer:
const initialState = {
	allSpots: {},
};
const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS: {
			const newState = {};
			action.spots.forEach((spot) => {
				newState[spot.id] = spot;
			});
			return { ...state, allSpots: newState };
		}
		case LOAD_SPOT: {
			return { ...state, [action.spot.id]: action.spot };
		}
		case ADD_SPOT: {
			return { ...state, [action.spot.id]: action.spot };
		}
		case UPDATE_SPOT: {
			return { ...state, [action.spot.id]: action.spot };
		}
		case REMOVE_SPOT: {
			const newState = { ...state };
			delete newState[action.spotId];
			return newState;
		}
		case LOAD_SINGLE_SPOT:
			return { ...state, singleSpot: action.spot };
		default:
			return state;
	}
};

export default spotsReducer;
