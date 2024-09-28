const express = require("express");
const { ReviewImage, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//> delete a review image || DELETE /api/review-images/:imageId

router.delete("/:imageId", requireAuth, async (req, res, next) => {
	const { imageId } = req.params;
	try {
		const reviewImage = await ReviewImage.findByPk(imageId, {
			include: {
				model: Review,
				attributes: ["userId"],
			},
		});

		if (!reviewImage) {
			return res
				.status(404)
				.json({ message: "Review Image couldn't be found" });
		}

		if (reviewImage.Review.userId !== req.user.id) {
			return res.status(403).json({
				message: "Forbidden",
			});
		}

		await reviewImage.destroy();

		res.status(200).json({
			message: "Successfully deleted",
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
