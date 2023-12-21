import sequelize from "../utils/database.js";
import { dataValid } from "../validation/dataValidation.js";
import Mentors from "../models/mentorModel.js";
const setMentor = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        mentorName: "required",
        expertise: "required",
        rating: "required",
    };
    try {
        const mentor = await dataValid(valid, req.body);
        if (mentor.message.length > 0) {
            return res.status(400).json({
                errors: mentor.message,
                message: "Mentor Fail or Wrong Input",
                data: null,
            });
        }
        const mentorExists = await Mentors.findAll({
            where: {
                mentorName: mentor.data.mentorName,
            },
        });
        if (mentorExists.length > 0) {
            return res.status(400).json({
                errors: ["Mentor already add"],
                message: "Register Fail",
                data: null,
            });
        } else {
            Mentors.destroy(
                {
                    where: {
                        mentorName: mentor.data.mentorName,
                    },
                },
                {
                    transaction: t,
                }
            );
        }
        const newMentor = await Mentors.create(
            {
                ...mentor.data,
            },
            {
                transaction: t,
            }
        );
        await t.commit();
        res.status(201).json({
            errors: null,
            message: "Mentor Created",
            data: {
                mentorName: newMentor.mentorName,
                expertise: newMentor.expertise,
                rating: newMentor.rating,
            },
        });
    } catch (error) {
        await t.rollback();
        next(new Error("controllers/mentorController.js:setMentor - " + error.message));
    }
};

const getMentor = async (req, res, next) => {
    try {
        const mentor = await Mentors.findAll();
        res.status(200).json({
            errors: [],
            message: "Mentor retrieved successfully",
            data: mentor,
        });
    } catch (error) {
        next(new Error("controllers/mentorController.js:getMentor - " + error.message));
    }
};

export {
    setMentor,
    getMentor
};
