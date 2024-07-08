import express from "express";
import { registerUser } from "../controllers/register.controller";
import { userValidationRules, validate } from "../middlewares/Validators";

const router = express.Router();
router.post("/register", userValidationRules(), validate, registerUser);

export default router;