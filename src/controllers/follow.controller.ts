import { Request, Response } from 'express';
import Follow, { IFollow } from '../models/follow';
import User from '../models/user';

export const createFollow = async (req: Request, res: Response) => {
    try {
        const { follower, following } = req.body;
        
        const existingFollow = await Follow.findOne({ follower, following });
        if (existingFollow) {
            return res.status(400).json({ message: 'Follow relationship already exists' });
        }

        const newFollow = new Follow({ follower, following });
        await newFollow.save();
        res.status(201).json(newFollow);
    } catch (error) {
        res.status(500).json({ message: 'Error creating follow relationship', error });
    }
};

export const getAllFollowers = async (req: Request, res: Response) => {
    try {
        const follows: IFollow[] = await Follow.find().populate('follower following', 'email'); 
        if (follows.length === 0) {
            return res.status(404).json({ message: 'No followers available' });
        } else {
            return res.json({ data: follows });
        }
    } catch (error) {
        console.error('Error fetching data from the database', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getFollowerById = async (req: Request, res: Response) => {
    try {
        const followerId = req.params.followerId;
        const follower: IFollow | null = await Follow.findById(followerId).populate('follower following', 'username');

        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        } else {
            return res.json({ data: follower });
        }
    } catch (error) {
        console.error('Error fetching data from the database', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const unfollow = async (req: Request, res: Response) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized: User not logged in' });
        }
        const userId = req.session.user.userID;
        const { following } = req.body; 

        const follow = await Follow.findOne({ follower: userId, following });

        if (!follow) {
            return res.status(400).json({ message: 'Follow relationship does not exist' });
        }

        await Follow.deleteOne({ _id: follow._id });

        res.status(200).json({ message: 'User unfollowed' });
    } catch (error) {
        console.error('Error unfollowing user', error);
        res.status(500).json({ message: 'Server error' });
    }
};
