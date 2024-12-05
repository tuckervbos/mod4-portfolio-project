"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate(
			[
				{
					spotId: 1,
					userId: 2,
					review: "Fantastic canal house! Highly recommend it.",
					stars: 5,
				},
				{
					spotId: 1,
					userId: 3,
					review: "Loved the historic vibe and the location.",
					stars: 4,
				},
				{
					spotId: 2,
					userId: 4,
					review: "Unique experience living on a houseboat!",
					stars: 5,
				},
				{
					spotId: 2,
					userId: 5,
					review: "Tranquil and cozy, but a bit cramped.",
					stars: 3,
				},
				{
					spotId: 3,
					userId: 6,
					review: "Beautiful architecture and great amenities.",
					stars: 4,
				},
				{
					spotId: 3,
					userId: 7,
					review: "Loved the modern feel of this home.",
					stars: 5,
				},
				{
					spotId: 4,
					userId: 8,
					review: "Amazing view of Erasmus Bridge!",
					stars: 5,
				},
				{
					spotId: 4,
					userId: 9,
					review: "Stylish and centrally located.",
					stars: 4,
				},
				{
					spotId: 5,
					userId: 10,
					review: "The design of this place is incredible!",
					stars: 5,
				},
				{
					spotId: 5,
					userId: 1,
					review: "Expensive but worth every penny.",
					stars: 4,
				},
				{
					spotId: 6,
					userId: 2,
					review: "Peaceful and scenic countryside retreat.",
					stars: 5,
				},
				{
					spotId: 6,
					userId: 3,
					review: "Perfect for a weekend getaway.",
					stars: 4,
				},
				{ spotId: 7, userId: 4, review: "Picturesque and charming.", stars: 5 },
				{
					spotId: 7,
					userId: 5,
					review: "A lovely little cottage in Giethoorn.",
					stars: 4,
				},
				{
					spotId: 8,
					userId: 6,
					review: "Loved the proximity to Haarlem's attractions.",
					stars: 5,
				},
				{
					spotId: 8,
					userId: 7,
					review: "Stylish and comfortable apartment.",
					stars: 4,
				},
				{
					spotId: 9,
					userId: 8,
					review: "Great spot in Rotterdam's art district.",
					stars: 5,
				},
				{
					spotId: 9,
					userId: 9,
					review: "Trendy and vibrant area to stay in.",
					stars: 4,
				},
				{
					spotId: 10,
					userId: 10,
					review: "The perfect Delft experience!",
					stars: 5,
				},
				{ spotId: 10, userId: 1, review: "Cozy and convenient.", stars: 4 },
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			review: {
				[Op.in]: [
					"Fantastic canal house! Highly recommend it.",
					"Loved the historic vibe and the location.",
					"Unique experience living on a houseboat!",
					"Tranquil and cozy, but a bit cramped.",
					"Beautiful architecture and great amenities.",
					"Loved the modern feel of this home.",
					"Amazing view of Erasmus Bridge!",
					"Stylish and centrally located.",
					"The design of this place is incredible!",
					"Expensive but worth every penny.",
					"Peaceful and scenic countryside retreat.",
					"Perfect for a weekend getaway.",
					"Picturesque and charming.",
					"A lovely little cottage in Giethoorn.",
					"Loved the proximity to Haarlem's attractions.",
					"Stylish and comfortable apartment.",
					"Great spot in Rotterdam's art district.",
					"Trendy and vibrant area to stay in.",
					"The perfect Delft experience!",
					"Cozy and convenient.",
				],
			},
		});
	},
};
