"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(models.User, { foreignKey: "id" });
			Review.belongsTo(models.Spot, { foreignKey: "id" });
			Review.hasMany(models.ReviewImage, {
				foreignKey: "reviewId",
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
		}
	);
	return Review;
};
