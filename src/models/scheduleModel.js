import sequelize from "../utils/database.js";
import { Sequelize } from "sequelize";

const Schedule = sequelize.define(
    "Schedule",
    {
        scheduleId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        codeClass: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nameMentor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        start_at: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        end_at: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.STRING,
        },
    },
    {
        tableName: "schedule",
        underscored: true,
        timestamps: true,
    }
);

sequelize.sync();

export default Schedule;