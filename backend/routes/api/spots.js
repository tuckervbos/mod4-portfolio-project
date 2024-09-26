const express = require("express");
const { Spot, SpotImage, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Sequelize } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// router.get("/", (req, res) => {
// 	console.log("GET /api/spots hit");
// 	res.json({ message: "Spots endpoint works" });
// });

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

// get all spots || GET /api/spotsg
router.get("/", async (req, res, next) => {
	const { spotId } = req.params;

	try {
		const spots = await Spot.findAll({
			attributes: {
				include: [
					[
						Sequelize.literal(`(
							SELECT AVG(reviews.stars)
							FROM reviews
							WHERE reviews.spotId = Spot.id
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
				avgRating: spot.dataValues.avgRating || null, // Include avgRating
				previewImage:
					spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null, // Include previewImage
			};
		});

		res.status(200).json({
			Spots: formattedSpots,
		});
	} catch (err) {
		// console.error(err.title);
		next(err);
	}
});

// get all spots owned by current user || GET /api/spots/current
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
                            SELECT AVG(reviews.stars)
                            FROM reviews
                            WHERE reviews.spotId = Spot.id
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

//> get details of a spot from an id || GET /api/spots/:spotId
router.get("/:spotId", async (req, res, next) => {
	console.log("spotId:", req.params.spotId);
	const { spotId } = req.params;

	const id = parseInt(spotId, 10);
	console.log("Parsed ID:", id);
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
                            SELECT AVG(reviews.stars)
                            FROM reviews
                            WHERE reviews.spotId = Spot.id
                        )`),
						"avgRating",
					],
					// Count the number of reviews
					[
						Sequelize.literal(`(
                            SELECT COUNT(reviews.id)
                            FROM reviews
                            WHERE reviews.spotId = Spot.id
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
			avgRating: spot.dataValues.avgRating || null,
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

// create a spot || POST /api/spots
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

// edit a spot || PUT /api/spots/:spotId
router.put("/:spotId", requireAuth, async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot not found" });
	}
	if (spot.ownerId !== req.user.id) {
		return res.status(403).json({ message: "Unauthorized" });
	}
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	await spot.update({
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});
	res.json(spot);
});

// delete a spot || DELETE /api/spots/:spotId
router.delete("/:spotId", requireAuth, async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot not found" });
	}
	if (spot.ownerId !== req.user.id) {
		return res.status(403).json({ message: "Unauthorized" });
	}
	await spot.destroy();
	res.json({ message: "Spot deleted" });
});

module.exports = router;
