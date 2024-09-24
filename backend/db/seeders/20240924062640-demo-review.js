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
					review: "Great place to stay, highly recommended!",
					stars: 5,
				},
				{
					spotId: 2,
					userId: 1,
					review: "Decent spot, but a bit pricey.",
					stars: 3,
				},
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
					"Great place to stay, highly recommended!",
					"Decent spot, but a bit pricey.",
				],
			},
		});
	},
};
