// backend/routes/api/users.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// validate signup middleware
const validateSignup = [
	check("firstName")
		.exists({ checkFalsy: true })
		.withMessage("First Name is required"),
	check("lastName")
		.exists({ checkFalsy: true })
		.withMessage("Last Name is required"),
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Invalid Email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Username is required"),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// // Sign up
// router.post("/", validateSignup, async (req, res, next) => {
// 	try {
// 		const { firstName, lastName, email, password, username } = req.body;
// 		const hashedPassword = bcrypt.hashSync(password);

// 		const existingUser = await User.findOne({
// 			where: {
// 				email: email,
// 				username: username,
// 			},
// 		});
// 		if (existingUser) {
// 			return res.status(500).json({
// 				message: "User already exists",
// 				errors: {
// 					email: "User with that email already exists",
// 					username: "User with that username already exists",
// 				},
// 			});
// 		}

// 		const user = await User.create({
// 			firstName,
// 			lastName,
// 			email,
// 			username,
// 			hashedPassword,
// 		});

// 		const safeUser = {
// 			id: user.id,
// 			firstName: user.firstName,
// 			lastName: user.lastName,
// 			email: user.email,
// 			username: user.username,
// 		};

// 		await setTokenCookie(res, safeUser);

// 		return res.status(201).json({
// 			user: safeUser,
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// });

// Sign up route
router.post("/", validateSignup, async (req, res, next) => {
	const { email, password, username, firstName, lastName } = req.body;

	// Check if a user already exists with the same email or username
	const existingUserByEmail = await User.findOne({ where: { email } });
	const existingUserByUsername = await User.findOne({ where: { username } });

	if (existingUserByEmail || existingUserByUsername) {
		const errors = {};
		if (existingUserByEmail)
			errors.email = "User with that email already exists";
		if (existingUserByUsername)
			errors.username = "User with that username already exists";

		return res.status(500).json({
			message: "User already exists",
			errors,
		});
	}

	// Create the new user if no conflicts exist
	const hashedPassword = bcrypt.hashSync(password);
	const user = await User.create({
		email,
		username,
		hashedPassword,
		firstName,
		lastName,
	});

	const safeUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
	};

	// Set authentication cookie
	await setTokenCookie(res, safeUser);

	return res.status(201).json({ user: safeUser });
});

module.exports = router;
