import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
import User from "./userModel.js";

const Mentors = sequelize.define(
    "Mentors",
    {
        mentorId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        fullName: {
            type: Sequelize.VIRTUAL,
            get() {
                return this.firstName + " " + lastName;
            },
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.serDataValue("email", value.toLowerCase());
            },
        },
        expertise: {
            type: Sequelize.STRING,
        },
        overview: {
            type: Sequelize.STRING,
        },
        education: {
            type: Sequelize.STRING,
        },
        experience: {
            type: Sequelize.STRING,
        }
    }, {
    tableName: "mentor",
    underscored: true,
});

User.hasMany(Mentors, {
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Mentors.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

sequelize.sync();

export default Mentors;