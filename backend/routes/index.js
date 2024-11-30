const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// static routes
// serve react build files in production
if (process.env.NODE_ENV === "production") {
	const path = require("path");
	// serve frontend's index.html file at the root route
	router.get("/", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../../frontend", "dist", "index.html")
		);
	});

	// Serve the static assets in the frontend's build folder
	router.use(express.static(path.resolve("../frontend/dist")));

	// Serve the frontend's index.html file at all other routes NOT starting with /api
	router.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../../frontend", "dist", "index.html")
		);
	});
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
	router.get("/api/csrf/restore", (req, res) => {
		const csrfToken = req.csrfToken();
		res.cookie("XSRF-TOKEN", csrfToken);
		res.status(200).json({
			"XSRF-Token": csrfToken,
		});
	});
}

// Keep this route to test frontend setup in Mod 5
// Test Route
// router.post("/test", (req, res) => {
// 	console.log("Request Body:", req.body);
// 	res.json({ requestBody: req.body });
// });

module.exports = router;
