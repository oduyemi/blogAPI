import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} from "../controllers/post.controller";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

router.post("/", protect, upload.single("img"), createPost);
router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.put("/:postId", protect, upload.single("img"), updatePost);
router.delete("/:postId", protect, deletePost);

export default router;