const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { ValidationError } = require("sequelize");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

// core middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// security middleware
if (!isProduction) {
	app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);

// set _csrf token and create req.csrfToken method
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

app.use(routes); // connect all routes (NO "/api" !!!)

// catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = { message: "The requested resource couldn't be found." };
	err.status = 404;
	next(err);
});

// process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a sequelize error:
	if (err instanceof ValidationError) {
		let errors = {};
		for (let error of err.errors) {
			errors[error.path] = error.message;
		}
		err.title = "Validation error";
		err.errors = errors;
	}
	next(err);
});

// error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: isProduction ? null : err.title || "Server Error",
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
