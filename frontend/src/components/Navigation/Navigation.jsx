import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { PiWindmill } from "react-icons/pi";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">
						<PiWindmill />
					</NavLink>
				</li>
				<li>
					<NavLink to="/">air-holland</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navigation;
