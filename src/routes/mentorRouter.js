import express from "express";
import { authenticate } from "../controllers/errorHandling.js";
import {
    setMentor,
    getMentor,
    getMentorById,
    updateMentor,
    deleteMentor,
} from "../controllers/mentorController.js";
const mentorRouter = express.Router();

mentorRouter.post("/mentor/register", authenticate, setMentor);
mentorRouter.get("/mentor", authenticate, getMentor);
mentorRouter.get("/mentor/:id", authenticate, getMentorById);
mentorRouter.put("/mentor/:id", authenticate, updateMentor);
mentorRouter.delete("/mentor/:id", authenticate, deleteMentor);

export default mentorRouter;

