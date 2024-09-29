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
	// .isLength({ min: 1, max: 30 })
	// .withMessage("First name must be between 1 and 30 characters"),

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

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, username } = req.body;
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			firstName,
			lastName,
			email,
			username,
			hashedPassword,
		});

		const safeUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		};

		await setTokenCookie(res, safeUser);

		return res.status(201).json({
			user: safeUser,
		});
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			const errors = {};
			err.errors.forEach((error) => {
				errors[error.path] = error.message; // Dynamically get field name and message
			});

			return res.status(500).json({
				message: "User already exists",
				errors: errors,
			});
		}

		next(err);
	}
});

module.exports = router;
// comment to test pushing to github
