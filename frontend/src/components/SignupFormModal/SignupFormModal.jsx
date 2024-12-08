import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = [];

		if (!email.includes("@")) newErrors.push("The provided email is invalid.");
		if (username.length < 4)
			newErrors.push("Username must be at least 4 characters.");
		if (password.length < 6)
			newErrors.push("Password must be at least 6 characters.");
		if (password !== confirmPassword) newErrors.push("Passwords must match.");

		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			await dispatch(
				sessionActions.signup({
					firstName,
					lastName,
					email,
					username,
					password,
				})
			);
			closeModal();
		} catch (res) {
			const data = await res.json();
			if (data?.errors) {
				setErrors((prevErrors) => [
					...prevErrors,
					...Object.values(data.errors),
				]);
			}
		}
	};

	const isButtonDisabled =
		!firstName ||
		!lastName ||
		!email ||
		!username ||
		!password ||
		password.length < 6 ||
		confirmPassword !== password;

	return (
		<div className="signup-modal-container">
			<h1>Sign Up</h1>
			{errors.length > 0 && (
				<div className="errors-container">
					{errors.map((error, idx) => (
						<p key={idx} className="error-message">
							{error}
						</p>
					))}
				</div>
			)}
			<form onSubmit={handleSubmit} noValidate>
				<div className="form-group">
					<input
						type="text"
						value={firstName}
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<input
						type="text"
						value={lastName}
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<input
						type="email"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<input
						type="text"
						value={username}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<button type="submit" disabled={isButtonDisabled}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
