import sequelize from "../utils/database.js";
import { dataValid } from "../validation/dataValidation.js";
import Schedule from "../models/scheduleModel.js";
const setSchedule = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nameMentor: "required",
        codeClass: "required",
        start_at: "required",
        end_at: "required",
        date: "required",
    };
    try {
        // const user = req.body;
        const schedule = await dataValid(valid, req.body);
        if (schedule.message.length > 0) {
            return res.status(400).json({
                errors: schedule.message,
                message: "Schedule Fail",
                data: null,
            });
        }
        const scheduleExists = await Schedule.findAll({
            where: {
                codeClass: schedule.data.codeClass,
            },
        });
        if (scheduleExists.length > 0) {
            return res.status(400).json({
                errors: ["Schedule already activated"],
                message: "Register Fail",
                data: null,
            });
        } else {
            Schedule.destroy(
                {
                    where: {
                        nameMentor: schedule.data.nameMentor,
                    },
                },
                {
                    transaction: t,
                }
            );
        }
        const newSchedule = await Schedule.create(
            {
                ...schedule.data,
                // expireTime: new Date(),
            },
            {
                transaction: t,
            }
        );
        await t.commit();
        res.status(201).json({
            errors: null,
            message: "Schedule Created",
            data: {
                nameMentor: newSchedule.nameMentor,
                codeClass: newSchedule.codeClass,
                start_at: newSchedule.start_at,
                end_at: newSchedule.end_at,
                date: newSchedule.date,
            },
        });
    } catch (error) {
        await t.rollback();
        next(new Error("controllers/scheduleController.js:setSchedule - " + error.message));
    }
};

const getSchedule = async (req, res, next) => {
    try {
        const schedule = await Schedule.findAll();
        res.status(200).json({
            errors: [],
            message: "Schedule retrieved successfully",
            data: schedule,
        });
    } catch (error) {
        next(new Error("controllers/scheduleController.js:getSchedule - " + error.message));
    }
};

export {
    setSchedule,
    getSchedule
};
