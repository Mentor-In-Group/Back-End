import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
import Schedule from "./scheduleModel.js";

const Booking = sequelize.define(
    "Booking",
    {
        bookingId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        scheduleId: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.STRING,
        },
        isBooking: {
            type: Sequelize.BOOLEAN,
        },
    },
    {
        tableName: "booking",
        underscored: true,
    }
);

Schedule.hasMany(Booking, {
    foreignKey: "scheduleId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Booking.belongsTo(Schedule, {
    foreignKey: "scheduleId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

sequelize.sync();

export default Booking;