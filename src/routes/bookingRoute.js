import express from "express";
import { bookSchedule, getBookingById } from "../controllers/bookingController.js";
const bookingRouter = express.Router();

bookingRouter.post("/booking", bookSchedule);
bookingRouter.get("/booking", getBookingById);

export default bookingRouter;