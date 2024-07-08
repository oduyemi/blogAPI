import { Request, Response } from "express";
import Category, { ICategory } from "../models/category";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post categories", error });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const category: ICategory | null = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Post category not found" });
        } else {
            return res.json({ data: category });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const updatedCategoryData: Partial<ICategory> = req.body;

        const requiredFields = ["name", "slug"];
        const missingFields = requiredFields.filter(field => !(field in updatedCategoryData));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedCategoryData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Post category not found" });
        }

        return res.json({ data: updatedCategory });
    } catch (error) {
        console.error("Error updating post category", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Post category not found" });
        }

        await Category.findByIdAndDelete(categoryId);
        return res.status(200).json({ message: "Post category deleted successfully" });
    } catch (error) {
        console.error("Error deleting post category:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
