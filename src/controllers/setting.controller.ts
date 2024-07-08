import { Request, Response } from "express";
import Setting, { ISetting } from "../models/setting";




export const createSetting = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;
        const newSetting = new Setting({ key, value });
        await newSetting.save();
        res.status(201).json(newSetting);
    } catch (error) {
        res.status(500).json({ message: "Error creating setting", error });
    }
};

export const getAllSettings = async (req: Request, res: Response) => {
    try {
        const settings: ISetting[] = await Setting.find();
        if (settings.length === 0) {
            return res.status(404).json({ message: "Settings not available" });
        } else {
            return res.json({ data: settings });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getSettingById = async (req: Request, res: Response) => {
    try {
        const settingId = req.params.settingId;
        const setting: ISetting | null = await Setting.findById(settingId);

        if (!setting) {
            return res.status(404).json({ message: "Setting not found" });
        } else {
            return res.json({ data: setting });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateSetting = async (req: Request, res: Response) => {
    try {
        const settingId = req.params.settingId;
        const { key, value } = req.body;
        const updatedSetting = await Setting.findByIdAndUpdate(
            settingId,
            { key, value },
            { new: true }
        );

        if (!updatedSetting) {
            return res.status(404).json({ message: "Setting not found" });
        } else {
            return res.json({ data: updatedSetting });
        }
    } catch (error) {
        console.error("Error updating data in the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteSetting = async (req: Request, res: Response) => {
    try {
        const settingId = req.params.settingId;
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const setting = await Setting.findById(settingId);
        if (!setting) {
            return res.status(404).json({ message: "Setting not found" });
        }

        await Setting.findByIdAndDelete(settingId);
        return res.status(200).json({ message: "Setting deleted successfully" });
    } catch (error) {
        console.error("Error deleting setting:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
