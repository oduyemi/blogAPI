import { Request, Response } from "express";
import Media from "../models/media";




export const createMedia = async (req: Request, res: Response) => {
    try {
        const { postId, url, mediaType } = req.body;
        const newMedia = new Media({ postId, url, mediaType });
        await newMedia.save();
        res.status(201).json(newMedia);
    } catch (error) {
        res.status(500).json({ message: "Error creating media", error });
    }
};

export const getAllMedia = async (req: Request, res: Response) => {
    try {
        const media = await Media.find();
        if (media.length === 0) {
            return res.status(404).json({ message: "No media found" });
        } else {
            return res.json({ data: media });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching media", error });
    }
};

export const getMediaById = async (req: Request, res: Response) => {
    try {
        const mediaId = req.params.mediaId;
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        } else {
            return res.json({ data: media });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching media", error });
    }
};

export const deleteMedia = async (req: Request, res: Response) => {
    try {
        const mediaId = req.params.mediaId;
        const media = await Media.findByIdAndDelete(mediaId);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        } else {
            return res.status(200).json({ message: "Media deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting media", error });
    }
};
