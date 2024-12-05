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
					url: "https://plus.unsplash.com/premium_photo-1664303000625-9da917c7fcfe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 2,
					url: "https://plus.unsplash.com/premium_photo-1730143960166-b440c5f2b735?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 3,
					url: "https://images.unsplash.com/photo-1551040938-85f1272a29c3?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 4,
					url: "https://images.unsplash.com/photo-1516910388786-b81b04b0c4a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 5,
					url: "https://images.unsplash.com/photo-1694713627584-2e73e0d54b09?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 6,
					url: "https://images.unsplash.com/photo-1700865493215-c5666addb78f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 7,
					url: "https://images.unsplash.com/photo-1604048620638-9b4e446ad1a1?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 8,
					url: "https://images.unsplash.com/photo-1606481021733-5e269f7d87f6?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 9,
					url: "https://images.unsplash.com/photo-1457685373807-8c4d8be4c560?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
				{
					reviewId: 10,
					url: "https://images.unsplash.com/photo-1595442770105-546b818af072?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "ReviewImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			reviewId: { [Op.in]: Array.from({ length: 20 }, (_, i) => i + 1) },
		});
	},
};
