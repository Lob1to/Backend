import { Request, Response } from "express";
import { Category } from "../../data/mongo";


export class CategoriesController {

    public createCategory = async (req: Request, res: Response) => {
        try {
            const {
                name,
                description,
            } = req.body;

            if (!name || !description) {
                return res.status(400).json({ success: false, message: 'Missing information.', data: null });
            }

            const category = new Category({
                name,
                description,
            });

            category.save();

            return res.status(201).json({ success: true, message: 'Category created successfully', data: { id: category._id } });


        } catch (error) {
            res.status(500).json({ success: false, message: 'An error occurred while creating the product', data: null });
        }
    }

}

