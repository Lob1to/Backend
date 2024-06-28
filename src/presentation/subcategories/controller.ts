import { Request, Response } from "express";
import { Subcategory } from "../../data/mongo";


export class SubcategoriesController {

    public createCategory = async (req: Request, res: Response) => {
        try {
            const {
                name,
                description,
                categoryId
            } = req.body;

            if (!name || !description || !categoryId) {
                return res.status(400).json({ success: false, message: 'Missing information.', data: null });
            }

            const subcategory = new Subcategory({
                name,
                description,
                categoryId
            });

            subcategory.save();

            return res.status(201).json({ success: true, message: `Subcategory "${subcategory.name}" created successfully`, data: { id: subcategory._id } });


        } catch (error) {
            res.status(500).json({ success: false, message: 'An error occurred while creating the product', data: null });
        }
    }

}

