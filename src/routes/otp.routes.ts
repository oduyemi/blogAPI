import express from "express";
import { verifyOTP } from "../controllers/otp.controller";

const router = express.Router();

router.post("/verify", verifyOTP);

export default router;