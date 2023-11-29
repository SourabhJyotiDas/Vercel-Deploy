import express from "express";
import { loginUser, logoutUser, profile, registerUser } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Router = express.Router()

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logoutUser);
Router.route("/me").get(isAuthenticated, profile);

export default Router;