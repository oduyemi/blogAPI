import { Request, Response } from 'express';
import Media from '../models/media';

export const createMedia = async (req: Request, res: Response) => {
    try {
        const { postId, url, mediaType } = req.body;
        const newMedia = new Media({ postId, url, mediaType });
        await newMedia.save();
        res.status(201).json(newMedia);
    } catch (error) {
        res.status(500).json({ message: 'Error creating media', error });
    }
};

// Add more functions like getAllMedia, getMediaById, deleteMedia if needed
