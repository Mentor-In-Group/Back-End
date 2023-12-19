import Schedule from "../models/scheduleModel.js";
import { dataValid } from "../validation/dataValidation.js";

const getSchedule = async (req, res, next) => {
    try {
        const schedule = await Schedule.findAll({});
        if (!schedule) {
            return res.status(404).json({
                errors: ["schedule not found"],
                message: "Get Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Get Schedule successfully",
            data: address,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:getSchedule - " + error.message
            )
        );
    }
};

const getScheduleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const schedule = await Schedule.findOne({
            where: {
                scheduleId: id,
            },
        });
        if (!schedule) {
            return res.status(404).json({
                errors: ["Schedule not found"],
                message: "Get Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Get Schedule successfully",
            data: address,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:getScheduleById - " + error.message
            )
        );
    }
};

const addNewSchedule = async (req, res, next) => {
    try {
        const mentorId = req.params.id;
        const validSchedule = {
            nameMentor: "required",
            date: "required",
        };
        const schedule = await dataValid(validSchedule, req.body);
        if (schedule.message.length > 0) {
            return res.status(400).json({
                errors: schedule.message,
                message: "Add New Schedule Failed",
                data: schedule.data,
            });
        }
        const result = await Schedule.create({ ...schedule.data, mentorId });
        if (!result) {
            return res.status(404).json({
                errors: ["Schedule not found"],
                message: "Add New Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Schedule added successfully",
            data: schedule.data,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:addNewSchedule - " + error.message
            )
        );
    }
};

const updateSchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        const validSchedule = {
            nameMentor: "required",
            date: "required",
        };
        const schedule = await dataValid(validSchedule, req.body);
        if (schedule.message.length > 0) {
            return res.status(400).json({
                errors: schedule.message,
                message: "Update Schedule Failed",
                data: schedule.data,
            });
        }
        const result = await Schedule.update(
            { ...schedule.data },
            {
                where: {
                    scheduleId: id,
                },
            }
        );
        if (!result) {
            return res.status(404).json({
                errors: ["Schedule not found"],
                message: "Update Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Schedule updated successfully",
            data: schedule.data,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:updateSchedule - " + error.message
            )
        );
    }
};

const deleteSchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Schedule.destroy({
            where: {
                scheduleId: id,
            },
        });
        if (!result) {
            return res.status(404).json({
                errors: ["Schedule not found"],
                message: "Delete Schedule Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Schedule deleted successfully",
            data: null,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/scheduleController.js:deleteSchedule - " + error.message
            )
        );
    }
};

export {
    getSchedule,
    getScheduleById,
    updateSchedule,
    addNewSchedule,
    deleteSchedule,
};