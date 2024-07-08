import { Request, Response } from 'express';
import PostTag from '../models/postTag';

export const createPostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.body;
        const newPostTag = new PostTag({ postId, tagId });
        await newPostTag.save();
        res.status(201).json(newPostTag);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post-tag relationship', error });
    }
};

// Add more functions like getAllPostTags, getPostTagById, deletePostTag if needed
