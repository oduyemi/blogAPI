import { Request, Response } from 'express';
import Follow from '../models/follow';

export const createFollow = async (req: Request, res: Response) => {
    try {
        const { follower, following } = req.body;
        const newFollow = new Follow({ follower, following });
        await newFollow.save();
        res.status(201).json(newFollow);
    } catch (error) {
        res.status(500).json({ message: 'Error creating follow relationship', error });
    }
};

// Add more functions like getAllFollows, getFollowById, deleteFollow if needed
