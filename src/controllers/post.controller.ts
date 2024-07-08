import { Request, Response } from "express";
import { Types } from "mongoose";
import Post, { IPost } from "../models/post";


export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, slug, author } = req.body;
        let imgPath: string | undefined;

        if (req.file) {
            imgPath = req.file.path;
        } else {
            return res.status(400).json({ message: "Image file is required." });
        }

        const newPost = await Post.create({
            title,
            content,
            slug,
            author,
            img: imgPath
        });

        res.status(201).json({ post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post." });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts: IPost[] = await Post.find();
        if (posts.length === 0) {
            return res.status(404).json({ message: "Posts not available" });
        } else {
            return res.json({ data: posts });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const post: IPost | null = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        } else {
            return res.json({ data: post });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const updatedPostData: Partial<IPost> = req.body;

        const requiredFields = ["title", "content", "slug", "author"];
        const missingFields = requiredFields.filter(field => !(field in updatedPostData));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        if (req.file) {
            updatedPostData.img = req.file.path;
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.json({ data: updatedPost });
    } catch (error) {
        console.error("Error updating post", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const postUserID = Types.ObjectId.isValid(post.author) ? post.author.toString() : post.author;
        if (postUserID !== req.session.user.userID) {
            return res.status(401).json({ message: "Unauthorized: User not authorized to delete this post" });
        }

        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
