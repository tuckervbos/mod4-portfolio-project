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

// login thunk:
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

// restore user thunk:
export const restoreUser = () => async (dispatch) => {
	// fetch current session user:
	const res = await csrfFetch("/api/session");
	const data = await res.json();
	// populate store with session user:
	dispatch(setUser(data.user));
	return res;
};

// signup thunk:
export const signup = (user) => async (dispatch) => {
	const { firstName, lastName, username, email, password } = user;
	const res = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			firstName,
			lastName,
			username,
			email,
			password,
		}),
	});
	const data = await res.json();
	dispatch(setUser(data.user)); // set user in store
	return res;
};

// logout thunk:
export const logout = () => async (dispatch) => {
	const res = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
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
