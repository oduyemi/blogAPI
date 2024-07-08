import { Request, Response } from "express";
import PostTag, { IPostTag } from "../models/postTag";




export const createPostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.body;
        const newPostTag = new PostTag({ postId, tagId });
        await newPostTag.save();
        res.status(201).json(newPostTag);
    } catch (error) {
        res.status(500).json({ message: "Error creating post-tag relationship", error });
    }
};

export const getAllPostTags = async (req: Request, res: Response) => {
    try {
        const postTags: IPostTag[] = await PostTag.find();
        if (postTags.length === 0) {
            return res.status(404).json({ message: "PostTags not available" });
        } else {
            return res.json({ data: postTags });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPostTagById = async (req: Request, res: Response) => {
    try {
        const postTagId = req.params.postTagId;
        const postTag: IPostTag | null = await PostTag.findById(postTagId);

        if (!postTag) {
            return res.status(404).json({ message: "PostTag not found" });
        } else {
            return res.json({ data: postTag });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updatePostTag = async (req: Request, res: Response) => {
    try {
        const postTagId = req.params.postTagId;
        const { postId, tagId } = req.body;
        const updatedPostTag = await PostTag.findByIdAndUpdate(
            postTagId,
            { postId, tagId },
            { new: true }
        );

        if (!updatedPostTag) {
            return res.status(404).json({ message: "PostTag not found" });
        } else {
            return res.json({ data: updatedPostTag });
        }
    } catch (error) {
        console.error("Error updating data in the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletePostTag = async (req: Request, res: Response) => {
    try {
        const postTagId = req.params.postTagId;
        const deletedPostTag = await PostTag.findByIdAndDelete(postTagId);

        if (!deletedPostTag) {
            return res.status(404).json({ message: "PostTag not found" });
        } else {
            return res.status(200).json({ message: "PostTag deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
