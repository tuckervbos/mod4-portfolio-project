"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	// define your schema in options object
	options.schema = process.env.SCHEMA;
}

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(models.User, { foreignKey: "userId", as: "User" });
			Review.belongsTo(models.Spot, { foreignKey: "spotId", as: "Spot" });
			Review.hasMany(models.ReviewImage, {
				foreignKey: "reviewId",
				as: "ReviewImages",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	Review.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "Spots", key: "id" },
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "Users", key: "id" },
			},
			review: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			stars: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
		},
		{
			sequelize,
			modelName: "Review",
			...options,
		}
	);
	return Review;
};
