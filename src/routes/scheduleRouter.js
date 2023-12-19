import express from "express";
import { authenticate } from "../controllers/errorHandling.js";
import {
    getSchedule,
    getScheduleById,
    updateSchedule,
    addNewSchedule,
    deleteSchedule,
} from "../controllers/scheduleController.js";
const scheduleRouter = express.Router();

scheduleRouter.get("/schedules", authenticate, getSchedule);
scheduleRouter.get("/schedules/:id", authenticate, getScheduleById);
scheduleRouter.put("/schedules/:id", authenticate, updateSchedule);
scheduleRouter.post("/schedules/:id", authenticate, addNewSchedule);
scheduleRouter.delete("/schedules/:id", authenticate, deleteSchedule);

export default scheduleRouter;