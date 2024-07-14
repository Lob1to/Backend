import { MongoDatabase } from '../init';
import { CategoryModel, SubcategoryModel, ProductModel, OrderModel } from '../';
import { categories, subcategories, products, orders } from './seedData';
import { envs } from '../../../config';
import mongoose from 'mongoose';

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });

        // Clear existing data
        await Promise.all([
            CategoryModel.deleteMany({}),
            SubcategoryModel.deleteMany({}),
            ProductModel.deleteMany({}),
            OrderModel.deleteMany({})
        ]);

        // Seed categories and subcategories
        const createdCategories = await CategoryModel.insertMany(categories);
        const createdSubcategories = await SubcategoryModel.insertMany(subcategories.map(sub => ({
            ...sub,
            categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id
        })));

        // Seed products with random category and subcategory IDs
        const createdProducts = await ProductModel.insertMany(products.map(product => ({
            ...product,
            categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id,
            subcategoryId: createdSubcategories[Math.floor(Math.random() * createdSubcategories.length)]._id
        })));

        // Seed orders with random product IDs
        await OrderModel.insertMany(orders.map(order => ({
            ...order,
            items: order.items.map(item => ({
                ...item,
                product: createdProducts[Math.floor(Math.random() * createdProducts.length)]._id
            }))
        })));

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
    }
}

// Run the seed function
seedDatabase();
