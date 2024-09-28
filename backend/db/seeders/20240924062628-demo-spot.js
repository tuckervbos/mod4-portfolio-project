"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate(
			[
				{
					ownerId: 1,
					address: "123 Main St",
					city: "New York",
					state: "NY",
					country: "USA",
					lat: 40.7128,
					lng: -74.006,
					name: "Central Park Apartment",
					description: "A lovely spot near Central Park.",
					price: 200,
				},
				{
					ownerId: 2,
					address: "456 Broadway",
					city: "San Francisco",
					state: "CA",
					country: "USA",
					lat: 37.7749,
					lng: -122.4194,
					name: "Golden Gate Escape",
					description: "A cozy spot near the Golden Gate Bridge.",
					price: 300,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			name: { [Op.in]: ["Central Park Apartment", "Golden Gate Escape"] },
		});
	},
};
