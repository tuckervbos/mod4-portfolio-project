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
					lastName: "Vandenbos",
					email: "tucker@demo.com",
					username: "TuckerDemo",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "DJ",
					lastName: "Smith",
					email: "dj@user.com",
					username: "DJSmith",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Josh",
					lastName: "Brown",
					email: "josh@user.com",
					username: "JoshB",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Lisa",
					lastName: "Jones",
					email: "lisa@user.com",
					username: "LisaJ",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Emma",
					lastName: "Van Dijk",
					email: "emma@user.com",
					username: "EmmaVD",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Tom",
					lastName: "Jansen",
					email: "tom@user.com",
					username: "TomJ",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Eva",
					lastName: "De Vries",
					email: "eva@user.com",
					username: "EvaDV",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Liam",
					lastName: "Bakker",
					email: "liam@user.com",
					username: "LiamB",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Sophia",
					lastName: "Visser",
					email: "sophia@user.com",
					username: "SophiaV",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: "Lucas",
					lastName: "Meijer",
					email: "lucas@user.com",
					username: "LucasM",
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
			username: {
				[Op.in]: [
					"TuckerDemo",
					"DJSmith",
					"JoshB",
					"LisaJ",
					"EmmaVD",
					"TomJ",
					"EvaDV",
					"LiamB",
					"SophiaV",
					"LucasM",
				],
			},
		});
	},
};
