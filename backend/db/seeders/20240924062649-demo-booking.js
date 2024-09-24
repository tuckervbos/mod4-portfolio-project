"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Booking.bulkCreate(
			[
				{
					spotId: 1,
					userId: 2,
					startDate: "2024-09-20",
					endDate: "2024-09-25",
				},
				{
					spotId: 2,
					userId: 1,
					startDate: "2024-10-10",
					endDate: "2024-10-15",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Bookings";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			spotId: { [Op.in]: [1, 2] },
		});
	},
};
