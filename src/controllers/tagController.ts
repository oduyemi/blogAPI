import { Request, Response } from 'express';
import Tag from '../models/tag';

export const createTag = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;
        const newTag = new Tag({ name, slug });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tag', error });
    }
};

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tags', error });
    }
};

// Add more functions like getTagById, updateTag, deleteTag if needed
