const express = require("express");
const { SpotImage, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//> delete a spot image || DELETE /api/spot-images/:imageId

router.delete("/:imageId", requireAuth, async (req, res, next) => {
	const { imageId } = req.params;

	try {
		const spotImage = await SpotImage.findByPk(imageId, {
			include: {
				model: Spot,
				attributes: ["ownerId"],
			},
		});

		if (!spotImage) {
			return res.status(404).json({ message: "Spot Image couldn't be found" });
		}
		if (spotImage.Spot.ownerId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}
		await spotImage.destroy();
		res.status(200).json({ message: "Successfully deleted" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
