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
					address: "Prinsengracht 263",
					city: "Amsterdam",
					state: "Noord-Holland",
					country: "Netherlands",
					lat: 52.3752,
					lng: 4.8832,
					name: "Classic Canal House",
					description:
						"Stay in a historic canal house with stunning views of the Prinsengracht.",
					price: 300,
				},
				{
					ownerId: 2,
					address: "Amstel 22",
					city: "Amsterdam",
					state: "Noord-Holland",
					country: "Netherlands",
					lat: 52.3668,
					lng: 4.8977,
					name: "Houseboat on the Amstel",
					description:
						"Enjoy the tranquility of canal living on a stylish houseboat.",
					price: 400,
				},
				{
					ownerId: 3,
					address: "Laan van Meerdervoort 50",
					city: "Den Haag",
					state: "Zuid-Holland",
					country: "Netherlands",
					lat: 52.0786,
					lng: 4.2888,
					name: "Modern Architectural Home",
					description:
						"A uniquely designed home in the heart of The Hague's vibrant neighborhoods.",
					price: 250,
				},
				{
					ownerId: 4,
					address: "Erasmus Bridge Lane 5",
					city: "Rotterdam",
					state: "Zuid-Holland",
					country: "Netherlands",
					lat: 51.9225,
					lng: 4.4791,
					name: "Erasmusbrug City Views",
					description:
						"Luxury apartment with panoramic views of the port and Erasmus Bridge.",
					price: 350,
				},
				{
					ownerId: 5,
					address: "Zaanweg 22",
					city: "Zaandam",
					state: "Noord-Holland",
					country: "Netherlands",
					lat: 52.4388,
					lng: 4.8144,
					name: "Zaandam Iconic Hotel",
					description:
						"Experience the quirky charm of this hotel designed like stacked Dutch houses.",
					price: 500,
				},
				{
					ownerId: 6,
					address: "Windmill Lane 9",
					city: "Zundert",
					state: "Noord-Brabant",
					country: "Netherlands",
					lat: 51.4719,
					lng: 4.6551,
					name: "Van Gogh's Windmill Retreat",
					description:
						"Charming countryside windmill with serene fields and stunning sunsets.",
					price: 200,
				},
				{
					ownerId: 7,
					address: "Canal Lane 4",
					city: "Giethoorn",
					state: "Overijssel",
					country: "Netherlands",
					lat: 52.7213,
					lng: 6.0765,
					name: "Giethoorn Cottage",
					description:
						"Stay in the picturesque boat village with access to canals and cozy shops.",
					price: 180,
				},
				{
					ownerId: 8,
					address: "De Koepel 10",
					city: "Haarlem",
					state: "Noord-Holland",
					country: "Netherlands",
					lat: 52.3874,
					lng: 4.6462,
					name: "Haarlem Dome Apartment",
					description: "Stylish apartment near Haarlem's famous dome.",
					price: 270,
				},
				{
					ownerId: 9,
					address: "Witte de Withstraat 25",
					city: "Rotterdam",
					state: "Zuid-Holland",
					country: "Netherlands",
					lat: 51.9175,
					lng: 4.4818,
					name: "Art District Loft",
					description: "Trendy loft in Rotterdam's bustling art district.",
					price: 320,
				},
				{
					ownerId: 10,
					address: "Markt 12",
					city: "Delft",
					state: "Zuid-Holland",
					country: "Netherlands",
					lat: 52.0116,
					lng: 4.3571,
					name: "Charming Delft Townhouse",
					description: "A cozy townhouse in the historic center of Delft.",
					price: 240,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			name: {
				[Op.in]: [
					"Classic Canal House",
					"Houseboat on the Amstel",
					"Modern Architectural Home",
					"Erasmusbrug City Views",
					"Zaandam Iconic Hotel",
					"Van Gogh's Windmill Retreat",
					"Giethoorn Cottage",
					"Haarlem Dome Apartment",
					"Art District Loft",
					"Charming Delft Townhouse",
				],
			},
		});
	},
};
