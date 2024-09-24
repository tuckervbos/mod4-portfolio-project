"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					firstName: "Tucker",
					lastName: "Demo",
					email: "tucker@demo.io",
					username: "TuckerDemo1",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "DJ",
					lastName: "Demo",
					email: "dj@demo.io",
					username: "DJDemo2",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Josh",
					lastName: "Demolition",
					email: "josh@demo.io",
					username: "JoshDemo3",
					hashedPassword: bcrypt.hashSync("password"),
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			username: { [Op.in]: ["TuckerDemo1", "DJDemo2", "JoshDemo3"] },
		});
	},
};
