"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await ReviewImage.bulkCreate(
			[
				{
					reviewId: 1,
					url: "https://example.com/review1.jpg",
				},
				{
					reviewId: 2,
					url: "https://example.com/review2.jpg",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "ReviewImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			reviewId: { [Op.in]: [1, 2] },
		});
	},
};
