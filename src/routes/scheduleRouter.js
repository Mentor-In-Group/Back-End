import express from "express";
import { setSchedule, getSchedule } from "../controllers/scheduleController.js";
const scheduleRouter = express.Router();

scheduleRouter.post("/schedules/scheduling", setSchedule);
scheduleRouter.get("/schedules", getSchedule);

export default scheduleRouter;