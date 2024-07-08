import express from "express";
import { createComment, getCommentsByPostId, updateComment, deleteComment } from "../controllers/comment.controller";
import { userAuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/:postId", userAuthMiddleware, createComment);
router.get("/:postId", getCommentsByPostId);
router.put("/:commentId", userAuthMiddleware, updateComment);
router.delete("/:commentId", userAuthMiddleware, deleteComment);

export default router;