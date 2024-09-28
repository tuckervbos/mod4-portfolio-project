"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate(
			[
				{
					spotId: 1,
					url: "https://picsum.photos/200/300",
					preview: true,
				},
				{
					spotId: 2,
					url: "https://picsum.photos/200/400",
					preview: true,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			spotId: { [Op.in]: [1, 2] },
		});
	},
};
