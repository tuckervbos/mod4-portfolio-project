"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	// define your schema in options object
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Spots",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				ownerId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Users", key: "id" },
					onDelete: "CASCADE",
				},
				address: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				city: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				state: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				country: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				lat: {
					type: Sequelize.DECIMAL,
					allowNull: false,
				},
				lng: {
					type: Sequelize.DECIMAL,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				description: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				price: {
					type: Sequelize.DECIMAL,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		await queryInterface.dropTable(options);
	},
};
