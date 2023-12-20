import express from "express";
import userRouter from "./userRouter.js";
import { errorrHandling } from "../controllers/errorHandling.js";
import scheduleRouter from "./scheduleRouter.js";
const route = express.Router();

route.use("/mentorin", userRouter);
route.use("/mentorin", scheduleRouter);
route.use("*", errorrHandling);
route.use("*", (req, res) => {
    res.status(404).json({
        errors: ["Page Not Found"],
        message: "Internal Server Error",
        data: null,
    });
});
export default route;
