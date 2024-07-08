import express from "express";
import { loginUser } from "../controllers/user.controller";
import { loginValidationRules, validate } from "../middlewares/Validators";

const router = express.Router();

router.post("/login", loginValidationRules(), validate, loginUser);

export default router;