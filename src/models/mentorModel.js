import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";

const Mentors = sequelize.define(
    "Mentors",
    {
        mentorId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        mentorName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expertise: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
        },
    },
    {
        tableName: "mentor",
        underscored: true,
    }
);

sequelize.sync();

export default Mentors;