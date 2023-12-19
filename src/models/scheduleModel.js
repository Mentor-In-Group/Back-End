import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
import Mentors from "./mentorModel.js";

const Schedule = sequelize.define(
    "Schedule",
    {
        scheduleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        quota: {
            type: Sequelize.INTEGER,
        }
    },
    {
        tableName: "schedule",
        underscored: true,
    }
);

Mentors.hasMany(Schedule, {
    foreignKey: "scheduleId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Schedule.belongsTo(Mentors, {
    foreignKey: "scheduleId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

sequelize.sync();

export default Schedule;