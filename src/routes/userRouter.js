import express from "express";
import {
    setUser,
    setActivateUser,
    getUser,
    setLogin,
    setRefreshToken,
    updateUser,
    deleteUser,
    forgotPassword
} from "../controllers/userController.js";
import { authenticate } from "../controllers/errorHandling.js";
const userRouter = express.Router();

userRouter.post("/users/register", setUser);
userRouter.get("/users", getUser);
userRouter.get("/users/activate/:id", setActivateUser);
userRouter.post("/users/login", setLogin);
userRouter.get("/users/refresh", setRefreshToken);
userRouter.patch("/users/:id", authenticate, updateUser);
userRouter.delete("/users/:id", authenticate, deleteUser);
userRouter.get("/users/forgot-password", forgotPassword);

export default userRouter;