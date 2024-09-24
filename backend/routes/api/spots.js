const express = require("express");
const { Spot, SpotImage, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// get all spots || GET /api/spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll();
	res.json(spots);
});

// get all spots owned by current user || GET /api/spots/current
router.get("/current", requireAuth, async (req, res) => {
	const spots = await Spot.findAll({
		where: { ownerId: req.user.id },
	});
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
