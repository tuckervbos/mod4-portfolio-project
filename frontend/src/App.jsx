import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import SpotList from "./components/SpotList/SpotList";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import * as sessionActions from "./store/session";
import SpotReviews from "./components/SpotReviews/SpotReviews";

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</>
	);
}

// const ProtectedRoute = ({ children }) => {
// 	const user = useSelector((state) => state.session.user);

// 	if (!user) {
// 		return <Navigate to="/" replace />;
// 	}

// 	return children;
// };

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "/", element: <LandingPage /> },
			{ path: "/spots", element: <SpotList /> },
			{ path: "/spots/:id", element: <SpotDetails /> },
			{ path: "/spots/:id/reviews", element: <SpotReviews /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
