import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

console.log("Environment Mode:", import.meta.env.MODE);

if (import.meta.env.MODE !== "production") {
	restoreCSRF();
	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
