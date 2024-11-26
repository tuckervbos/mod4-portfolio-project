import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const removeUser = () => ({
	type: REMOVE_USER,
});

// thunk action: login
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const res = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({ credential, password }),
	});
	const data = await res.json();
	dispatch(setUser(data.user));
	return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		default:
			return state;
	}
};

export default sessionReducer;
