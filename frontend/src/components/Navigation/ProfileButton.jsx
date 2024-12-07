import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef(); // created a reference, attached to <ul> elem

	const toggleMenu = (e) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
		navigate("/");
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button className="profile-button" onClick={toggleMenu}>
				<GiHamburgerMenu />
				<FaUserCircle />
			</button>

			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>Hello, {user.firstName}</li>
						<li>{user.email}</li>
						<li>
							<Link to="/manage-spots" onClick={closeMenu}>
								Manage Spots
							</Link>
						</li>
						<li>
							<button onClick={logout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						<OpenModalMenuItem
							itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalMenuItem
							itemText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
