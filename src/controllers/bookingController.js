import sequelize from "../utils/database.js";
import Schedule from "../models/scheduleModel.js";
import Booking from "../models/bookingModel.js";

const bookSchedule = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const validBooking = {
            scheduleId: "required",
        };
        const booking = await dataValid(validBooking, req.body);
        if (booking.message.length > 0) {
            return res.status(400).json({
                errors: booking.message,
                message: "Booking Schedule Failed",
                data: booking.data,
            });
        }
        const schedule = await Schedule.findOne({
            where: {
                scheduleId: scheduleId,
            },
        });
        const result = await Booking.create({ ...schedule.data, bookingId, isBooking: true, });
        if (!result) {
            return res.status(404).json({
                errors: ["Schedule not found"],
                message: "Booking Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Booking Schedule successfully",
            data: booking.data,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/bookingController.js:bookSchedule - " + error.message
            )
        );
    }
};

const getBookingById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findOne({
            where: {
                bookingId: id,
            },
        });
        if (!booking) {
            return res.status(404).json({
                errors: ["Booking not found"],
                message: "Get Booking Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Get Booking successfully",
            data: date,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:getBookingById - " + error.message
            )
        );
    }
};

export { bookSchedule, getBookingById };