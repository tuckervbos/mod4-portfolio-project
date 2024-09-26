const express = require("express");
const { Spot, SpotImage, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Sequelize } = require("sequelize");

// router.get("/", (req, res) => {
// 	console.log("GET /api/spots hit");
// 	res.json({ message: "Spots endpoint works" });
// });

// get all spots || GET /api/spotsg
router.get("/", async (req, res, next) => {
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
router.get("/current", requireAuth, async (req, res) => {
	const spots = await Spot.findAll();
	// where: { ownerId: req.user.id },

	res.json(spots);
});

// get details of a spot from an id || GET /api/spots/:spotId
router.get("/:spotId", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot not found" });
	}
	res.json(spot);
});

// create a spot || POST /api/spots
router.post("/", requireAuth, async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
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
	});
	res.status(201).json(spot);
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
