import express from "express";
import userRouter from "./userRouter.js";
import { errorrHandling } from "../controllers/errorHandling.js";
import scheduleRouter from "./scheduleRouter.js";
import mentorRouter from "./mentorRoute.js";
const route = express.Router();

route.use("/mentorin", userRouter);
route.use("/mentorin", scheduleRouter);
route.use("/mentorin", mentorRouter);
route.use("*", errorrHandling);
route.use("*", (req, res) => {
    res.status(404).json({
        errors: ["Page Not Found"],
        message: "Internal Server Error",
        data: null,
    });
});
export default route;
