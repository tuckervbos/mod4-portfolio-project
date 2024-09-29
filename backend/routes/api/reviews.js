const express = require("express");
const {
	Review,
	Spot,
	SpotImage,
	User,
	ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

//> get all reviews of current user || GET /api/reviews/current

router.get("/current", requireAuth, async (req, res, next) => {
	try {
		const reviews = await Review.findAll({
			where: { userId: req.user.id },
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
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
				{
					model: ReviewImage,
					attributes: ["id", "url"],
				},
			],
		});

		const formattedReviews = reviews.map((review) => {
			return {
				id: review.id,
				userId: review.userId,
				spotId: review.spotId,
				review: review.review,
				stars: review.stars,
				createdAt: review.createdAt,
				updatedAt: review.updatedAt,
				User: review.User || {},
				Spot: {
					id: review.Spot?.id,
					ownerId: review.Spot?.ownerId,
					address: review.Spot?.address,
					city: review.Spot?.city,
					state: review.Spot?.state,
					country: review.Spot?.country,
					lat: review.Spot?.lat,
					lng: review.Spot?.lng,
					name: review.Spot?.name,
					price: review.Spot?.price,
					previewImage: review.Spot?.SpotImages[0]?.url || null, // Ensure preview image is added
				},
				ReviewImages: review.ReviewImages || [],
			};
		});
		res.status(200).json({ Reviews: formattedReviews });
	} catch (err) {
		next(err);
	}
});

// //> create a review for a spot based on spot's id || POST /api/spots/:spotId/reviews

// router.post(
// 	"/:spotId/reviews",
// 	requireAuth,
// 	validateReview,
// 	async (req, res, next) => {
// 		const { spotId } = req.params;
// 		const { review, stars } = req.body;

// 		try {
// 			const spot = await Spot.findByPk(spotId);
// 			if (!spot) {
// 				return res.status(404).json({ message: "Spot couldn't be found" });
// 			}

// 			const existingReview = await Review.findOne({
// 				where: { spotId, userId: req.user.id },
// 			});
// 			if (existingReview) {
// 				return res
// 					.status(500)
// 					.json({ message: "User already has a review for this spot" });
// 			}
// 			const newReview = await Review.create({
// 				spotId,
// 				userId: req.user.id,
// 				review,
// 				stars,
// 			});
// 			res.status(201).json({
// 				id: newReview.id,
// 				userId: newReview.userId,
// 				spotId: newReview.spotId,
// 				review: newReview.review,
// 				stars: newReview.stars,
// 				createdAt: newReview.createdAt,
// 				updatedAt: newReview.updatedAt,
// 			});
// 		} catch (err) {
// 			next(err);
// 		}
// 	}
// );

//> add an image to a review based on review's id || POST /api/reviews/:reviewId/images

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
	const { reviewId } = req.params;
	const { url } = req.body;

	try {
		const review = await Review.findByPk(reviewId);
		if (!review) {
			return res.status(404).json({ message: "Review couldn't be found" });
		}
		if (review.userId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}
		const imageCount = await ReviewImage.count({ where: { reviewId } });
		if (imageCount >= 10) {
			return res.status(403).json({
				message: "Maximum number of images for this resource was reached",
			});
		}
		const newImage = await ReviewImage.create({
			reviewId,
			url,
		});

		res.status(201).json({
			id: newImage.id,
			url: newImage.url,
		});
	} catch (err) {
		next(err);
	}
});

//> edit a review || PUT /api/reviews/:reviewId

router.put(
	"/:reviewId",
	requireAuth,
	validateReview,
	async (req, res, next) => {
		const { reviewId } = req.params;
		const { review, stars } = req.body;

		try {
			const existingReview = await Review.findByPk(reviewId);
			if (!existingReview) {
				return res.status(404).json({ message: "Review couldn't be found" });
			}
			if (existingReview.userId !== req.user.id) {
				return res.status(403).json({ message: "Forbidden" });
			}
			existingReview.review = review;
			existingReview.stars = stars;

			await existingReview.save();

			res.status(200).json({
				id: existingReview.id,
				userId: existingReview.userId,
				spotId: existingReview.spotId,
				review: existingReview.review,
				stars: existingReview.stars,
				createdAt: existingReview.createdAt,
				updatedAt: existingReview.updatedAt,
			});
		} catch (err) {
			next(err);
		}
	}
);

//> delete a review || DELETE /api/reviews/:reviewId

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
	const { reviewId } = req.params;

	try {
		const review = await Review.findByPk(reviewId);
		if (!review) {
			return res.status(404).json({ message: "Review couldn't be found" });
		}
		if (review.userId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}
		await review.destroy();

		return res.status(200).json({ message: "Successfully deleted" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
