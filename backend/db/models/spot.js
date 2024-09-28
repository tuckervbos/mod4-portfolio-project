"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Spot extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Spot.belongsTo(models.User, { as: "Owner", foreignKey: "ownerId" });
			Spot.hasMany(models.Review, {
				foreignKey: "spotId",
				onDelete: "CASCADE",
				hooks: true,
			});
			Spot.hasMany(models.SpotImage, {
				foreignKey: "spotId",
				onDelete: "CASCADE",
				hooks: true,
			});
			Spot.hasMany(models.Booking, {
				foreignKey: "spotId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	Spot.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "Users", key: "id" },
			},
			address: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			lat: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: -90,
					max: 90,
				},
			},
			lng: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: -180,
					max: 180,
				},
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
		},
		{
			sequelize,
			modelName: "Spot",
		}
	);
	return Spot;
};
