import { Op } from "sequelize";
import Schedule from "../models/scheduleModel.js";
import Mentors from "../models/mentorModel.js";
import sequelize from "../utils/database.js";
import { dataValid } from "../validation/dataValidation.js";
import { isExists } from "../validation/sanitization.js";

const setMentor = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        let lstError = [];
        // dapatkan data dari post
        let mentor = req.body;
        let schedule = [];
        if (isExists(mentor.Schedules)) {
            schedule = mentor.Schedules;
        }
        delete mentor.Schedules;
        // rule validasi mentor
        const validMentor = {
            firstName: "required",
        };
        mentor = await dataValid(validMentor, mentor);
        lstError.push(...mentor.message);
        // rule validasi schedule
        let dtl = await Promise.all(
            schedule.map(async (item) => {
                const scheduleClear = await dataValid(
                    {
                        nameMentor: "required",
                        quota: "requiered",
                    },
                    item
                );
                lstError.push(...scheduleClear.message);
                return scheduleClear.data;
            })
        );

        mentor = {
            ...mentor.data,
            userId: req.user.userId,
            Schedules: dtl,
        };

        // jika ada error kirimkan pesan
        if (lstError.length > 0) {
            return res.status(400).json({
                errors: lstError,
                message: "Create Mentor fail",
                data: mentor,
            });
        }

        // jika tidak ada error
        const createMentor = await Mentors.create(mentor, { transaction: t });
        const createSchedule = await Promise.all(
            mentor.Schedules.map(async (item) => {
                return await Schedule.create(
                    {
                        ...item,
                        mentorId: createMentor.mentorId,
                    },
                    {
                        transaction: t,
                    }
                );
            })
        );
        if (!createMentor || !createSchedule) {
            await t.rollback();
            return res.status(400).json({
                errors: ["Mentor not found"],
                message: "Create Mentor fail",
                data: mentor,
            });
        }
        await t.commit();
        return res.status(201).json({
            errors: [],
            message: "Mentor created successfully",
            data: { ...createMentor.dataValid, schedule: createSchedule },
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                "controllers/contactController.js:setMentor - " + error.message
            )
        );
    }
};
const getMentor = async (req, res, next) => {
    try {
        // persiapan filter
        const mentors = req.body;
        let schedule = [];
        if (isExists(mentors.Schedules)) {
            schedule = mentors.Schedules;
            delete mentors.Schedules;
        }

        // filter schedule
        let objFilter = [];
        const filterSchedule = await new Promise((resolve, reject) => {
            Object.entries(schedule).forEach(([key, value]) => {
                objFilter = {
                    ...objFilter,
                    [key]: {
                        [Op.like]: "%" + value + "%",
                    },
                };
            });
            resolve(objFilter);
        });

        // filter mentor
        let objMentor = [];
        const filterMentor = await new Promise((resolve, reject) => {
            Object.entries(mentors).forEach(([key, value]) => {
                objFilter = {
                    ...objMentor,
                    [key]: {
                        [Op.like]: "%" + value + "%",
                    },
                };
            });
            resolve(objFilter);
        });

        // cek ada filter atau tidak
        let data = null;
        if (Object.keys(filterSchedule).length == 0) {
            data = await Mentors.findAll({
                include: {
                    model: Schedule,
                },
                where: filterMentor,
            });
        } else {
            data = await Mentors.findAll({
                include: {
                    model: Schedule,
                    where: filterSchedule,
                },
                where: filterMentor,
            });
        }

        res.json({
            errors: [],
            message: "Get Mentor successfully",
            data: data,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/mentorController.js:getMentor - " + error.message
            )
        );
    }
};

const getMentorById = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const mentor = await Mentors.findOne({
            include: {
                model: Schedule,
            },
            where: {
                mentorId: id,
            },
        });
        if (!mentor) {
            return res.status(404).json({
                errors: ["Mentor not found"],
                message: "Get Mentor Failed",
                data: null,
            });
        }
        return res.status(200).json({
            errors: [],
            message: "Get Mentor successfully",
            data: mentor,
        });
    } catch (error) {
        next(
            new Error(
                "controllers/mentorController.js:getMentorById - " + error.message
            )
        );
    }
};

const updateMentor = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        let lstError = [];
        const id = req.params.id;
        let mentor = req.body;

        // siapkan data
        let schedule = [];
        if (isExists(mentor.Schedules)) {
            mentor.Schedules.forEach((element) => {
                delete element.scheduleId;
                delete element.mentorId;
                schedule.push(element);
            });
        }
        // hapus data yang tidak digunakan
        delete mentor.Schedules;
        delete mentor.mentorId;

        const validMentor = {
            firstName: "required",
        };

        // bersihkan mentor dan validasi
        mentor = await dataValid(validMentor, mentor);
        // masukan error kedalam list
        lstError.push(...mentor.message);

        // validasi schedule
        let dtl = await Promise.all(
            schedule.map(async (item) => {
                const scheduleClear = await dataValid(
                    {
                        mentorName: "requiered",
                        date: "requiered",
                    },
                    item
                );
                lstError.push(...scheduleClear.message);
                return scheduleClear.data;
            })
        );

        // jika ada error kirimkan pesan
        if (lstError.length > 0) {
            await t.rollback();
            return res.status(400).json({
                errors: lstError,
                message: "Update Mentor Failed",
                data: mentor,
            });
        }

        // update mentor
        const resultUpd = await Mentors.update(
            {
                ...mentor.data,
            },
            {
                where: {
                    mentorId: id,
                },
                transaction: t,
            }
        );

        // hapus schedule yang lama
        const scheduleDelete = await Schedule.destroy({
            where: {
                mentorId: id,
            },
            transaction: t,
        });

        // buat schedule yang baru
        const insertSchedule = await Promise.all(
            dtl.map(async (item) => {
                const result = await Schedule.create(
                    {
                        ...item,
                        mentorId: id,
                    },
                    {
                        transaction: t,
                    }
                );
                return result;
            })
        );

        if (!resultUpd || !insertSchedule || !scheduleDelete) {
            await t.rollback();
            return res.status(400).json({
                errors: ["Mentor not found"],
                message: "Update Mentor Failed",
                data: mentor.data,
            });
        }

        // jika semua berhasil
        await t.commit();

        // kembalikan info hasil
        return res.status(200).json({
            errors: [],
            message: "Mentor updated successfully",
            data: {
                ...mentor.data,
                Schedules: insertSchedule,
            },
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                "controllers/mentorController.js:updateMentor - " + error.message
            )
        );
    }
};

const deleteMentor = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // dapatkan id dari user
        const id = req.params.id;

        // delete schedule
        const scheduleDelete = await Schedule.destroy({
            where: {
                mentorId: id,
            },
            transaction: t,
        });

        // delete mentor
        const mentorDelete = await Mentors.destroy({
            where: {
                mentorId: id,
            },
            transaction: t,
        });

        // jika ada yang gagal
        if (!mentorDelete || !scheduleDelete) {
            await t.rollback();
            return res.status(400).json({
                errors: ["Mentor not found"],
                message: "Delete Mentor Failed",
                data: null,
            });
        }

        // jika semua berhasil
        await t.commit();
        return res.status(200).json({
            errors: [],
            message: "Mentor deleted successfully",
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                "controllers/mentorController.js:deleteMentor - " + error.message
            )
        );
    }
};

export { setMentor, getMentor, getMentorById, updateMentor, deleteMentor };