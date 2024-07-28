import { MongoDatabase } from '../init';
import { UserModel, CategoryModel, SubcategoryModel, ProductModel, VariantModel, VariantTypeModel, CouponModel, OrderModel } from '../';
import { users, categories, subcategories, products, variants, variantTypes, coupons, orders } from './seedData';
import { envs } from '../../../config';
import mongoose from 'mongoose';

async function seedDatabase() {
    try {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });

        await Promise.all([
            UserModel.deleteMany({}),
            CategoryModel.deleteMany({}),
            SubcategoryModel.deleteMany({}),
            ProductModel.deleteMany({}),
            VariantModel.deleteMany({}),
            VariantTypeModel.deleteMany({}),
            CouponModel.deleteMany({}),
            OrderModel.deleteMany({})
        ]);

        const createdUsers = await UserModel.insertMany(users);
        const createdCategories = await CategoryModel.insertMany(categories);
        const createdSubcategories = await SubcategoryModel.insertMany(
            subcategories.map(sub => ({
                ...sub,
                categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id
            }))
        );
        const createdVariantTypes = await VariantTypeModel.insertMany(variantTypes);

        const createdProducts = await ProductModel.insertMany(
            products.map(product => ({
                ...product,
                categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id,
                subcategoryId: createdSubcategories[Math.floor(Math.random() * createdSubcategories.length)]._id,
                variantTypeId: createdVariantTypes[Math.floor(Math.random() * createdVariantTypes.length)]._id
            }))
        );

        const createdVariants = await VariantModel.insertMany(
            variants.map(variant => ({
                ...variant,
                variantType: createdVariantTypes[Math.floor(Math.random() * createdVariantTypes.length)]._id
            }))
        );

        await Promise.all(createdProducts.map(async (product, index) => {
            product.variantId = [createdVariants[index]._id.toString()];
            await product.save();
        }));

        await CouponModel.insertMany(
            coupons.map(coupon => ({
                ...coupon,
                applicableCategory: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id,
                applicableSubcategory: createdSubcategories[Math.floor(Math.random() * createdSubcategories.length)]._id,
                applicableProduct: createdProducts[Math.floor(Math.random() * createdProducts.length)]._id
            }))
        );

        await OrderModel.insertMany(
            orders.map(order => ({
                ...order,
                user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
                items: order.items.map(item => ({
                    ...item,
                    product: createdProducts[Math.floor(Math.random() * createdProducts.length)]._id,
                    variant: createdVariants[Math.floor(Math.random() * createdVariants.length)]._id
                }))
            }))
        );

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
    }
}

seedDatabase();
