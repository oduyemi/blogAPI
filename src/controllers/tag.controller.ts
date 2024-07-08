import { Request, Response } from "express";
import Tag, { ITag } from "../models/tag";




export const createTag = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;
        const newTag = new Tag({ name, slug });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ message: "Error creating tag", error });
    }
};

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags", error });
    }
};

export const getTagById = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        const tag: ITag | null = await Tag.findById(tagId);

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        } else {
            return res.json({ data: tag });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTag = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        const updatedTagData: Partial<ITag> = req.body;

        const requiredFields = ["name", "slug"];
        const missingFields = requiredFields.filter(field => !(field in updatedTagData));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const updatedTag = await Tag.findByIdAndUpdate(tagId, updatedTagData, { new: true });

        return res.json({ data: updatedTag });
    } catch (error) {
        console.error("Error updating tag", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTag = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        await Tag.findByIdAndDelete(tagId);
        return res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error("Error deleting tag:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
