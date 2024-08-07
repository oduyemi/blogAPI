import express from "express";
import { initiatePasswordReset, resetPassword } from "../controllers/auth.controller";
import { passwordResetValidationRules, validate } from "../middlewares/Validators";

const router = express.Router();

router.post("/initiate-reset", passwordResetValidationRules(), validate, initiatePasswordReset); // Initiate password reset and send email
router.post("/reset-password", passwordResetValidationRules(), validate, resetPassword); // Reset password with the reset token

export default router;