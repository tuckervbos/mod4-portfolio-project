import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { PiWindmill } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav className="navbar">
			<div className="left-nav">
				<NavLink to="/" className="brand-logo">
					<PiWindmill className="windmill-icon" />
					<span className="brand-text">air-holland</span>
				</NavLink>
			</div>
			<div className="right-nav">
				{sessionUser && (
					<Link to="/spots/new" className="create-spot-button">
						Create a New Spot
					</Link>
				)}
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>
		</nav>
	);
}

export default Navigation;
