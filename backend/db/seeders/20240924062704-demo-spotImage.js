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
				// Amsterdam Classic Canal House
				{
					spotId: 1,
					url: "https://plus.unsplash.com/premium_photo-1661878743895-d7addb98570f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 1,
					url: "https://images.unsplash.com/photo-1533192957936-fbca59de6688?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 1,
					url: "https://images.unsplash.com/photo-1525615466489-bcc019b90420?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 1,
					url: "https://images.unsplash.com/photo-1514315234814-ceafc3e7f19d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 1,
					url: "https://images.unsplash.com/photo-1521404037219-60d9cfea18fc?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Amsterdam Houseboat
				{
					spotId: 2,
					url: "https://images.unsplash.com/photo-1689593423792-961b17d1d5c5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 2,
					url: "https://images.unsplash.com/photo-1518622923628-f909e4f7c583?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 2,
					url: "https://plus.unsplash.com/premium_photo-1677440437280-b410ab3ad976?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 2,
					url: "https://images.unsplash.com/photo-1544994082-7d8d56868f3e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 2,
					url: "https://images.unsplash.com/photo-1503328498065-2b9dc9a5c1cf?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// The Hague Modern Architectural Home
				{
					spotId: 3,
					url: "https://images.unsplash.com/photo-1574526386145-39cd52585cb8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 3,
					url: "https://images.unsplash.com/photo-1574526386048-ddbb97e40faa?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 3,
					url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 3,
					url: "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 3,
					url: "https://plus.unsplash.com/premium_photo-1661960806900-07d69d22b884?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Rotterdam Views near Erasmusbrug
				{
					spotId: 4,
					url: "https://images.unsplash.com/photo-1621080902123-489751053883?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 4,
					url: "https://plus.unsplash.com/premium_photo-1680553492268-516537c44d91?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 4,
					url: "https://plus.unsplash.com/premium_photo-1661874836011-b566efa88855?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 4,
					url: "https://images.unsplash.com/photo-1526283706298-03ba520844d1?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 4,
					url: "https://images.unsplash.com/photo-1539600148414-95e2bc5f5567?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Zaandam Iconic Hotel
				{
					spotId: 5,
					url: "https://images.unsplash.com/photo-1725747935593-2ac2a1c9c833?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 5,
					url: "https://images.unsplash.com/photo-1694290651798-11fa3fbf98d9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 5,
					url: "https://images.unsplash.com/photo-1666092415780-6044412f37a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 5,
					url: "https://images.unsplash.com/photo-1507209759648-4ee610e20c3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 5,
					url: "https://plus.unsplash.com/premium_photo-1727423645443-1001ac5d5768?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Van Gogh's Windmill Retreat
				{
					spotId: 6,
					url: "https://images.unsplash.com/photo-1511645768399-4dbb0689d959?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 6,
					url: "https://images.unsplash.com/photo-1727794360178-35f7ecea01ba?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 6,
					url: "https://images.unsplash.com/photo-1601234218843-74573c49478b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 6,
					url: "https://plus.unsplash.com/premium_photo-1661931625680-cd916bc75340?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 6,
					url: "https://images.unsplash.com/photo-1670319063980-de9ca9d30833?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Giethoorn Cottage
				{
					spotId: 7,
					url: "https://images.unsplash.com/photo-1633118920851-7eb29a89373b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 7,
					url: "https://images.unsplash.com/photo-1625825340008-30503bb4761c?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 7,
					url: "https://images.unsplash.com/photo-1626858509516-f996238906fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 7,
					url: "https://images.unsplash.com/photo-1603917817377-ee53733f5be8?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 7,
					url: "https://images.unsplash.com/photo-1633118920943-d527c9ee3825?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Haarlem Dome Apartment
				{
					spotId: 8,
					url: "https://plus.unsplash.com/premium_photo-1688466339297-4a65503b30c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 8,
					url: "https://images.unsplash.com/photo-1558252496-610f398c7b9e?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 8,
					url: "https://images.unsplash.com/photo-1610984867770-8fe58cb674e3?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 8,
					url: "https://images.unsplash.com/photo-1623854968982-53757254cfa8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 8,
					url: "https://images.unsplash.com/photo-1610538231202-be5fed56ecfd?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Art District Loft
				{
					spotId: 9,
					url: "https://images.unsplash.com/photo-1542989364-953d211f4b6a?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 9,
					url: "https://images.unsplash.com/photo-1534235792096-4f5a022d4c7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 9,
					url: "https://images.unsplash.com/photo-1705841819902-f678852374b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 9,
					url: "https://images.unsplash.com/photo-1663667012395-b93f1100bd66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 9,
					url: "https://images.unsplash.com/photo-1565612711442-ea05ac4b2874?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},

				// Charming Delft Townhouse
				{
					spotId: 10,
					url: "https://images.unsplash.com/photo-1595442770100-7dba0fcfcef1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: true,
				},
				{
					spotId: 10,
					url: "https://images.unsplash.com/photo-1572172758792-25c4265cea6a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 10,
					url: "https://images.unsplash.com/photo-1547120198-a4193142bd73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 10,
					url: "https://images.unsplash.com/photo-1661180874636-3631d66798c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
				},
				{
					spotId: 10,
					url: "https://images.unsplash.com/photo-1697456415682-77986ce135b8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					preview: false,
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
