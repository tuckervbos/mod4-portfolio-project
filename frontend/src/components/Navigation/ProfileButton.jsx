import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef(); // created a reference, attached to <ul> elem

	const toggleMenu = (e) => {
		e.stopPropagation(); // prevent event from reaching document:
		// if (!showMenu) setShowMenu(true);
		setShowMenu(!showMenu); // toggle dropdown visibility
	};

	useEffect(() => {
		// skip adding event listener if menu is hidden:
		if (!showMenu) return;

		const closeMenu = (e) => {
			// check if click is outside dropdown:
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu); // add event listener
		return () => document.removeEventListener("click", closeMenu); // cleanup
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button onClick={toggleMenu}>
				<FaUserCircle />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				<li>{user.username}</li>
				<li>{user.firstName}</li>
				<li>{user.email}</li>
				<li>
					<button onClick={logout}>Log Out</button>
				</li>
			</ul>
		</>
	);
}

export default ProfileButton;
