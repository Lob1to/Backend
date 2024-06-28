import { Request, Response } from "express";
import { Category, Product, Subcategory } from "../../data/mongo";

export class ProductsController {

    public createProduct = async (req: Request, res: Response) => {
        try {
            const {
                name,
                description,
                price,
                categoryId,
                subcategoryId,
                options,
                images,
            } = req.body;

            if (!name || !price || !categoryId || !subcategoryId || !options || !images) {
                return res.status(400).json({ success: false, message: 'Missing information.', data: null });
            }

            // Verificar si la categoría y subcategoría existen
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ success: false, message: 'Category not found', data: null });
            }

            const subcategory = await Subcategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(400).json({ success: false, message: 'Subcategory not found', data: null });
            }

            // Crear un nuevo producto
            const newProduct = new Product({
                name,
                description,
                price,
                categoryId,
                subcategoryId,
                options,
                images,
            });

            // Guardar el nuevo producto en la base de datos
            const savedProduct = await newProduct.save();

            res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
        } catch (error) {
            res.status(500).json({ success: false, message: 'An error occurred while creating the product', data: null });
        }
    }

    public getProductById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found', data: null });
            }
            res.status(200).json({ success: true, message: 'Product retrieved successfully', data: product });

        } catch (error) {
            res.status(500).json({ success: false, message: 'An error occurred while getting the product', data: error });
        }
    }

    public searchProducts = async (req: Request, res: Response) => {

        const {
            name,
            category,
            subcategory,
            minPrice,
            maxPrice,
        } = req.query;

        const query: any = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (subcategory) {
            query.subcategory = subcategory;
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }

        if (Object.keys(query).length === 0) {

            const products = await Product.find();
            return res.status(200).json({ success: true, message: "Products retrieved successfully", data: products });

        }

        try {

            const products = await Product.find(query)
                .populate('subcategoryId', 'name')

            res.status(200).json({ success: true, message: "Products retrieved successfully", data: products });
        } catch (error) {
            res.status(500).json({ success: false, message: `Error message from catch error: ${error}`, data: null });

        }

    }

    public updateProduct = (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, description, price, categoryId, subcategoryId, options, images } = req.body;

        try {
            Product.findByIdAndUpdate(id, { name, description, price, categoryId, subcategoryId, options, images }, { new: true })
                .then((product) => {
                    if (!product) {
                        return res.status(404).json({ success: false, message: 'Product not found', data: null });
                    }
                    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
                })
                .catch((error) => {
                    res.status(500).json({ success: false, message: 'Error updating product', data: error });
                });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating product', data: error });
        }
    }

    public deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found', data: null });
            }
            res.status(200).json({ success: true, message: 'Product deleted successfully', data: product });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting product', data: error });
        }
    }

}