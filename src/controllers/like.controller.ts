import { Request, Response } from "express";
import Like from "../models/like";
import Post from "../models/post";

export const likePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.session.user!.userID;

        const like = await Like.findOne({ user: userId, post: postId });

        if (like) {
            return res.status(400).json({ message: "Post already liked" });
        }

        const newLike = new Like({ user: userId, post: postId });
        await newLike.save();

        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

        res.status(201).json({ message: "Post liked" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.session.user!.userID;

        const like = await Like.findOne({ user: userId, post: postId });

        if (!like) {
            return res.status(400).json({ message: "Post not liked yet" });
        }

        await Like.deleteOne({ _id: like._id });

        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

        res.status(200).json({ message: "Post unliked" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};