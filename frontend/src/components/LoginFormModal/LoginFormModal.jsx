import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const isButtonDisabled = credential.length < 4 || password.length < 6;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		// dispatch login thunk:
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (res.status === 401 && data?.message) {
					setErrors({ credential: "The provided credentials were invalid." }); // Set the error message
				} else {
					setErrors({ credential: "Something went wrong. Please try again." });
				}
			});
	};

	const handleDemoLogin = () => {
		setErrors({});
		return dispatch(
			sessionActions.login({ credential: "TuckerDemo", password: "password" })
		)
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data?.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="modal-background">
			<div className="login-form-container">
				<h1>Log In</h1>
				<form onSubmit={handleSubmit}>
					{errors.credential && (
						<p className="error-message">{errors.credential}</p>
					)}
					<input
						type="text"
						placeholder="Username or Email"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit" disabled={isButtonDisabled}>
						Log In
					</button>
				</form>
				<hr />
				<button className="demo-user-link" onClick={handleDemoLogin}>
					Demo User
				</button>
			</div>
		</div>
	);
}

export default LoginFormModal;
