const express = require("express");
const { Booking, Spot, SpotImage, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const router = express.Router({ mergeParams: true });

// Get all bookings of the current user
router.get("/current", requireAuth, async (req, res) => {
	const userId = req.user.id;

	const bookings = await Booking.findAll({
		where: { userId },
		include: [
			{
				model: Spot,
				attributes: [
					"id",
					"ownerId",
					"address",
					"city",
					"state",
					"country",
					"lat",
					"lng",
					"name",
					"price",
				],
				include: [
					{
						model: SpotImage,
						attributes: ["url"],
						where: { preview: true },
						required: false,
					},
				],
			},
		],
	});

	const formattedBookings = bookings.map((booking) => ({
		id: booking.id,
		spotId: booking.spotId,
		Spot: {
			id: booking.Spot.id,
			ownerId: booking.Spot.ownerId,
			address: booking.Spot.address,
			city: booking.Spot.city,
			state: booking.Spot.state,
			country: booking.Spot.country,
			lat: parseFloat(booking.Spot.lat),
			lng: parseFloat(booking.Spot.lng),
			name: booking.Spot.name,
			price: parseFloat(booking.Spot.price),
			previewImage:
				booking.Spot.SpotImages.length > 0
					? booking.Spot.SpotImages[0].url
					: null,
		},
		userId: booking.userId,
		startDate: booking.startDate,
		endDate: booking.endDate,
		createdAt: booking.createdAt,
		updatedAt: booking.updatedAt,
	}));

	return res.json({ Bookings: formattedBookings });
});

// Helper function to invalidate dates
const invalidateDates = (startDate, endDate, res) => {
	const errors = {};
	const today = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (!startDate || isNaN(start)) {
		errors.startDate = "Invalid or missing startDate";
	}
	if (!endDate || isNaN(end)) {
		errors.endDate = "Invalid or missing endDate";
	}

	if (Object.keys(errors).length > 0) {
		res.status(400).json({
			message: "Bad Request",
			errors,
		});
		return true;
	}

	if (start < today) {
		errors.startDate = "startDate cannot be in the past";
	}
	if (end <= start) {
		errors.endDate = "endDate cannot be on or before startDate";
	}

	if (Object.keys(errors).length > 0) {
		res.status(400).json({
			message: "Bad Request",
			errors,
		});
		return true;
	}
	return false;
};

// Helper function to check for conflicts
const conflictExists = (startDateConflict, endDateConflict) => {
	const conflictErrors = {};
	if (startDateConflict) {
		conflictErrors.startDate = "Start date conflicts with an existing booking";
	}
	if (endDateConflict) {
		conflictErrors.endDate = "End date conflicts with an existing booking";
	}
	if (Object.keys(conflictErrors).length > 0) {
		res.status(403).json({
			message: "Sorry, this spot is already booked for the specified dates",
			errors: conflictErrors,
		});
		return true;
	}
	return false;
};

// Create a booking for a spot by spotId
router.post("/bookings", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const { startDate, endDate } = req.body;
	const userId = req.user.id;

	if (invalidateDates(startDate, endDate, res)) return;

	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	// Ensure the user is not booking their own spot
	if (spot.ownerId === userId) {
		return res.status(403).json({ message: "Forbidden" });
	}

	// Check if there are date conflicts with any existing booking
	const startDateConflict = await Booking.findOne({
		where: {
			spotId,
			[Op.and]: [
				{ startDate: { [Op.lte]: startDate } },
				{ endDate: { [Op.gte]: startDate } },
			],
		},
	});
	const endDateConflict = await Booking.findOne({
		where: {
			spotId,
			[Op.and]: [
				{ startDate: { [Op.lte]: endDate } },
				{ endDate: { [Op.gte]: endDate } },
			],
		},
	});

	if (conflictExists(startDateConflict, endDateConflict)) return;

	const newBooking = await Booking.create({
		spotId,
		userId,
		startDate,
		endDate,
	});

	return res.status(201).json(newBooking);
});

// Edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
	const { bookingId } = req.params;
	const { startDate, endDate } = req.body;
	const userId = req.user.id;

	const booking = await Booking.findByPk(bookingId);
	if (!booking) {
		return res.status(404).json({ message: "Booking couldn't be found" });
	}

	if (booking.userId !== userId) {
		return res
			.status(403)
			.json({ message: "Cannot edit someone else's booking" });
	}

	if (new Date(booking.endDate) < new Date()) {
		return res.status(403).json({ message: "Past bookings can't be modified" });
	}

	if (invalidateDates(startDate, endDate, res)) return;

	const startDateConflict = await Booking.findOne({
		where: {
			spotId: booking.spotId,
			[Op.and]: [
				{ startDate: { [Op.lte]: startDate } },
				{ endDate: { [Op.gte]: startDate } },
			],
			id: { [Op.ne]: bookingId },
		},
	});
	const endDateConflict = await Booking.findOne({
		where: {
			spotId: booking.spotId,
			[Op.and]: [
				{ startDate: { [Op.lte]: endDate } },
				{ endDate: { [Op.gte]: endDate } },
			],
			id: { [Op.ne]: bookingId },
		},
	});

	if (conflictExists(startDateConflict, endDateConflict)) return;

	await booking.update({ startDate, endDate });

	return res.json(booking);
});

// Delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
	const { bookingId } = req.params;
	const userId = req.user.id;

	const booking = await Booking.findByPk(bookingId);
	if (!booking) {
		return res.status(404).json({ message: "Booking couldn't be found" });
	}

	const spot = await Spot.findByPk(booking.spotId);
	if (booking.userId !== userId && spot.ownerId !== userId) {
		return res
			.status(403)
			.json({ message: "Cannot delete someone else's booking" });
	}

	if (new Date(booking.startDate) <= new Date()) {
		return res
			.status(403)
			.json({ message: "Bookings that have been started can't be deleted" });
	}

	await booking.destroy();
	return res.json({ message: "Successfully deleted" });
});

module.exports = router;
