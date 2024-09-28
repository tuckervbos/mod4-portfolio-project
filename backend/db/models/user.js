"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// A user can own many spots
			User.hasMany(models.Spot, { foreignKey: "ownerId", onDelete: "CASCADE" });

			// A user can write many reviews
			User.hasMany(models.Review, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});

			// A user can make many bookings
			User.hasMany(models.Booking, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,

				validate: {
					notEmpty: {
						msg: "First Name is required",
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,

				validate: {
					notEmpty: {
						msg: "Last Name is required",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { msg: "User with that email already exists" },
				validate: {
					notNull: {
						msg: "Invalid Email",
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { msg: "User with that username already exists" },
				validate: {
					notNull: {
						msg: "Username is required",
					},
					// isNotEmail(value) {
					// 	if (Validator.isEmail(value)) {
					// 		throw new Error("Cannot be an email.");
					// 	}
					// },
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
		}
	);
	return User;
};
