import express from "express";
import { setMentor, getMentor } from "../controllers/mentorController.js";
const mentorRouter = express.Router();

mentorRouter.post("/mentor/register", setMentor);
mentorRouter.get("/mentor", getMentor);

export default mentorRouter;