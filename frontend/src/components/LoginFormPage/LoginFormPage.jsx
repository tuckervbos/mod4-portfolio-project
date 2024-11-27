import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	// controlled inputs and error state:
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	// redirect if user is already logged in
	if (sessionUser) return <Navigate to="/" replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({}); // clear errors before attempting to login

		// dispatch login thunk:
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data?.errors) setErrors(data.errors); // set errors from the response
			}
		);
	};

	return (
		<div className="login-form-container">
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.credential && <p>{errors.credential}</p>}
				<button type="submit">Log In</button>
			</form>
		</div>
	);
}

export default LoginFormPage;
