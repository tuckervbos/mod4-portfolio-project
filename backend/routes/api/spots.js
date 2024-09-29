const express = require("express");
const {
	Spot,
	SpotImage,
	User,
	Review,
	ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Sequelize } = require("sequelize");
const { check, query, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const validateSpot = [
	check("name").exists({ checkFalsy: true }).withMessage("Name is required"),
	check("address")
		.exists({ checkFalsy: true })
		.withMessage("Street address is required"),
	check("city").exists({ checkFalsy: true }).withMessage("City is required"),
	check("state").exists({ checkFalsy: true }).withMessage("State is required"),
	check("country")
		.exists({ checkFalsy: true })
		.withMessage("Country is required"),
	check("lat")
		.exists({ checkFalsy: true }) // latitude may not be required, make it optional if so
		.isFloat({ min: -90, max: 90 }) // latitude must be between -90 and 90
		.withMessage("Latitude must be within -90 and 90"),
	check("lng")
		.exists({ checkFalsy: true }) // longitude may not be required, make it optional if so
		.isFloat({ min: -180, max: 180 }) // longitude must be between -180 and 180
		.withMessage("Longitude must be within -180 and 180"),
	check("description")
		.exists({ checkFalsy: true })
		.withMessage("Description is required"),
	check("price")
		.exists({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("Price per day must be a positive number"),
	handleValidationErrors,
];

const validateQueryParams = [
	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be greater than or equal to 1"),
	query("size")
		.optional()
		.isInt({ min: 1, max: 20 })
		.withMessage("Size must be between 1 and 20"),
	query("minLat")
		.optional()
		.isFloat()
		.withMessage("Minimum latitude is invalid"),
	query("maxLat")
		.optional()
		.isFloat()
		.withMessage("Maximum latitude is invalid"),
	query("minLng")
		.optional()
		.isFloat()
		.withMessage("Minimum longitude is invalid"),
	query("maxLng")
		.optional()
		.isFloat()
		.withMessage("Maximum longitude is invalid"),
	query("minPrice")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Minimum price must be greater than or equal to 0"),
	query("maxPrice")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Maximum price must be greater than or equal to 0"),
	handleValidationErrors,
];

const validateReview = [
	check("review")
		.exists({ checkFalsy: true })
		.withMessage("Review text is required"),
	check("stars")
		.exists({ checkFalsy: true })
		.isInt({ min: 1, max: 5 })
		.withMessage("Stars must be an integer from 1 to 5"),
	handleValidationErrors,
];

//> get all spots owned by current user || GET /api/spots/current

router.get("/current", requireAuth, async (req, res, next) => {
	try {
		const userId = req.user.id; // Authenticated user's ID

		const spots = await Spot.findAll({
			where: { ownerId: userId },
			attributes: {
				include: [
					// Calculate the average rating for each spot
					[
						Sequelize.literal(`(
							SELECT AVG("Reviews".stars)
							FROM "Reviews"
							WHERE "Reviews"."spotId" = "Spot.id"
						)`),
						"avgRating",
					],
				],
			},
			include: [
				{
					model: SpotImage,
					as: "SpotImages",
					attributes: ["url"],
					where: { preview: true }, // Only include preview images
					required: false,
				},
			],
		});

		const formattedSpots = spots.map((spot) => ({
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: spot.lat,
			lng: spot.lng,
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: spot.createdAt,
			updatedAt: spot.updatedAt,
			avgRating: spot.dataValues.avgRating || null,
			previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
		}));

		res.status(200).json({ Spots: formattedSpots });
	} catch (err) {
		next(err);
	}
});

// Get all bookings for a spot by spotId
router.get("/spots/:spotId/bookings", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const userId = req.user.id;

	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	const bookings = await Booking.findAll({
		where: { spotId },
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName"],
			},
		],
	});

	if (spot.ownerId !== userId) {
		// If current user is not the owner, return limited booking data
		const nonOwnerBookings = bookings.map((booking) => ({
			spotId: booking.spotId,
			startDate: booking.startDate,
			endDate: booking.endDate,
		}));
		return res.json({ Bookings: nonOwnerBookings });
	} else {
		// If current user is the owner, return full booking data
		const ownerBookings = bookings.map((booking) => ({
			User: {
				id: booking.User.id,
				firstName: booking.User.firstName,
				lastName: booking.User.lastName,
			},
			id: booking.id,
			spotId: booking.spotId,
			userId: booking.userId,
			startDate: booking.startDate,
			endDate: booking.endDate,
			createdAt: booking.createdAt,
			updatedAt: booking.updatedAt,
		}));
		return res.json({ Bookings: ownerBookings });
	}
});

//> get all reviews by a spot's id || GET /api/spots/:spotId/reviews

router.get("/:spotId/reviews", async (req, res, next) => {
	const { spotId } = req.params;

	try {
		const spot = await Spot.findByPk(spotId);
		if (!spot) {
			return res.status(404).json({
				message: "Spot couldn't be found",
			});
		}

		const reviews = await Review.findAll({
			where: { spotId },
			include: [
				{
					model: User,
					as: "User",
					attributes: ["id", "firstName", "lastName"],
				},
				{
					model: ReviewImage,
					as: "ReviewImages",
					attributes: ["id", "url"],
				},
			],
		});
		const formattedReviews = reviews.map((review) => ({
			id: review.id,
			userId: review.User.id,
			spotId: review.spotId,
			review: review.review,
			stars: review.stars,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			User: {
				id: review.User.id,
				firstName: review.User.firstName,
				lastName: review.User.lastName,
			},
			ReviewImages: review.ReviewImages.map((image) => ({
				id: image.id,
				url: image.url,
			})),
		}));

		res.status(200).json({ Reviews: formattedReviews });
	} catch (err) {
		next(err);
	}
});

//> get details of a spot from an id || GET /api/spots/:spotId

router.get("/:spotId", async (req, res, next) => {
	const { spotId } = req.params;
	const id = parseInt(spotId, 10);
	if (isNaN(id)) {
		return res.status(400).json({
			title: "Validation error",
			message: `${spotId} is not a valid integer`,
			errors: {
				id: `${spotId} is not a valid integer`,
			},
		});
	}

	try {
		const spotId = req.params.spotId;

		const spot = await Spot.findByPk(spotId, {
			attributes: {
				include: [
					// Calculate the average rating
					[
						Sequelize.literal(`(
                            SELECT AVG("Reviews".stars)
                            FROM "Reviews"
                            WHERE "Reviews"."spotId" = "Spot.id"
							)`),
						"avgRating",
					],
					// Count the number of reviews
					[
						Sequelize.literal(`(
								SELECT COUNT("Reviews".id)
								FROM "Reviews"
								WHERE "Reviews"."spotId" = "Spot.id"
								)`),
						"numReviews",
					],
				],
			},
			include: [
				{
					model: SpotImage,
					as: "SpotImages",
					attributes: ["id", "url", "preview"],
				},
				{
					model: User,
					as: "Owner",
					attributes: ["id", "firstName", "lastName"],
				},
			],
		});

		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}
		const formattedSpot = {
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: spot.lat,
			lng: spot.lng,
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: spot.createdAt,
			updatedAt: spot.updatedAt,
			numReviews: spot.dataValues.numReviews || 0,
			avgStarRating: spot.dataValues.avgRating || null,
			SpotImages: spot.SpotImages,
			Owner: {
				id: spot.Owner.id,
				firstName: spot.Owner.firstName,
				lastName: spot.Owner.lastName,
			},
		};

		res.status(200).json(formattedSpot);
	} catch (err) {
		next(err);
	}
});

//> get all spots || GET /api/spots

router.get("/", validateQueryParams, async (req, res, next) => {
	let {
		minLat,
		maxLat,
		minLng,
		maxLng,
		minPrice,
		maxPrice,
		page = 1,
		size = 20,
	} = req.query;

	page = parseInt(page);
	size = parseInt(size);
	if (page < 1) page = 1;
	if (size > 20) size = 20;

	const where = {};

	if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
	if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
	if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
	if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
	if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
	if (maxPrice)
		where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

	try {
		const spots = await Spot.findAll({
			where,
			limit: size,
			offset: (page - 1) * size,
			attributes: {
				include: [
					[
						Sequelize.literal(`(
									SELECT AVG("Reviews".stars)
									FROM "Reviews"
									WHERE "Reviews"."spotId" = "Spot.id"
									)`),
						"avgRating",
					],
				],
			},
			include: [
				{
					model: SpotImage,
					as: "SpotImages",
					attributes: ["url"],
					where: { preview: true },
					required: false,
				},
			],
		});
		const formattedSpots = spots.map((spot) => {
			return {
				id: spot.id,
				ownerId: spot.ownerId,
				address: spot.address,
				city: spot.city,
				state: spot.state,
				country: spot.country,
				lat: spot.lat,
				lng: spot.lng,
				name: spot.name,
				description: spot.description,
				price: spot.price,
				createdAt: spot.createdAt,
				updatedAt: spot.updatedAt,
				avgRating: spot.dataValues.avgRating || null,
				previewImage:
					spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
			};
		});

		res.status(200).json({
			Spots: formattedSpots,
			page,
			size,
		});
	} catch (err) {
		next(err);
	}
});

//> create a review for a spot based on spot's id || POST /api/spots/:spotId/reviews

router.post(
	"/:spotId/reviews",
	requireAuth,
	validateReview,
	async (req, res, next) => {
		const { spotId } = req.params;
		const { review, stars } = req.body;

		try {
			const spot = await Spot.findByPk(spotId);
			if (!spot) {
				return res.status(404).json({ message: "Spot couldn't be found" });
			}

			const existingReview = await Review.findOne({
				where: { spotId, userId: req.user.id },
			});
			if (existingReview) {
				return res
					.status(500)
					.json({ message: "User already has a review for this spot" });
			}
			const newReview = await Review.create({
				spotId,
				userId: req.user.id,
				review,
				stars,
			});
			res.status(201).json({
				id: newReview.id,
				userId: newReview.userId,
				spotId: newReview.spotId,
				review: newReview.review,
				stars: newReview.stars,
				createdAt: newReview.createdAt,
				updatedAt: newReview.updatedAt,
			});
		} catch (err) {
			next(err);
		}
	}
);

//> add an image to a spot based on spot's id || POST /api/spots/:spotId/images

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
	const { spotId } = req.params;
	const { url, preview } = req.body;

	try {
		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({
				message: "Spot couldn't be found",
			});
		}

		if (spot.ownerId !== req.user.id) {
			return res.status(403).json({
				message: "Forbidden",
			});
		}

		const newImage = await SpotImage.create({
			spotId: spot.id,
			url,
			preview: preview === true,
		});

		res.status(201).json({
			id: newImage.id,
			url: newImage.url,
			preview: newImage.preview,
		});
	} catch (err) {
		next(err);
	}
});

//> create a spot || POST /api/spots

router.post("/", requireAuth, validateSpot, async (req, res, next) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	try {
		const spot = await Spot.create({
			ownerId: req.user.id,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
			ownerId: req.user.id,
		});
		res.status(201).json(spot);
	} catch (err) {
		next(err);
	}
});

//> edit a spot || PUT /api/spots/:spotId

router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
	const { spotId } = req.params;
	const { name, address, city, state, country, lat, lng, description, price } =
		req.body;
	try {
		const spot = await Spot.findByPk(req.params.spotId);
		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}
		if (spot.ownerId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}

		spot.name = name;
		spot.address = address;
		spot.city = city;
		spot.state = state;
		spot.country = country;
		spot.lat = lat;
		spot.lng = lng;
		spot.description = description;
		spot.price = price;

		await spot.save();

		res.status(200).json(spot);
	} catch (err) {
		next(err);
	}
});

//> delete a spot || DELETE /api/spots/:spotId
router.delete("/:spotId", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	try {
		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}
		if (spot.ownerId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}
		await spot.destroy();

		res.json({ message: "Successfully deleted" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
