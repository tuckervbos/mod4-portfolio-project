import { NavLink } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
	return (
		<div className="not-found">
			<h1>404 - Page Not Found</h1>
			<p>Sorry, the page you are looking for doesn&apos;t exist.</p>
			<NavLink to="/" className="back-home-link">
				Return Home
			</NavLink>
		</div>
	);
}

export default NotFound;
