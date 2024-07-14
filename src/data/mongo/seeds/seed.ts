import mongoose from 'mongoose';
import { MongoDatabase, CategoryModel, ProductModel, SubcategoryModel, OrderModel } from '../';
import { envs } from '../../../config';
import { categories, subcategories, products, orders } from './seedData';

const clearCollections = async (): Promise<void> => {
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await SubcategoryModel.deleteMany({});
    await OrderModel.deleteMany({});
};

const insertCategories = async (): Promise<mongoose.Document[]> => {
    const categoryModels = categories.map(category => new CategoryModel(category));
    return await CategoryModel.insertMany(categoryModels);
};

const insertSubcategories = async (categoryModels: mongoose.Document[]): Promise<mongoose.Document[]> => {
    const subcategoryModels = subcategories.map(subcategory => {
        const category = categoryModels.find(c => c.get('name') === subcategory.categoryName);
        if (!category) throw new Error(`Categoria no encontrada para la subcategoria: ${subcategory.name}`);
        return new SubcategoryModel({ ...subcategory, categoryId: category._id });
    });
    return await SubcategoryModel.insertMany(subcategoryModels);
};

const insertProducts = async (categoryModels: mongoose.Document[], subcategoryModels: mongoose.Document[]): Promise<mongoose.Document[]> => {
    const productModels = products.map(product => {
        const category = categoryModels.find(c => c.get('name') === product.categoryName);
        const subcategory = subcategoryModels.find(s => s.get('name') === product.subcategoryName);
        if (!category || !subcategory) throw new Error(`Categoria o subcategoria no encontrada para el producto: ${product.name}`);
        return new ProductModel({
            ...product,
            categoryId: category._id,
            subcategoryId: subcategory._id
        });
    });
    return await ProductModel.insertMany(productModels);
};

const insertOrders = async (productModels: mongoose.Document[]): Promise<void> => {
    const orderModels = orders.map(order => {
        const items = order.items.map(item => {
            const product = productModels.find(p => p.get('name') === item.productName);
            if (!product) throw new Error(`Producto no encontrado para el item: ${item.productName}`);
            return {
                ...item,
                productId: product._id
            };
        });
        return new OrderModel({
            ...order,
            items
        });
    });
    await OrderModel.insertMany(orderModels);
};

const seedData = async (): Promise<void> => {
    console.log('Iniciando inserción de datos de prueba...');
    console.log('Conectando a la base de datos...');
    try {
        await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoUrl: envs.MONGO_URL });

        console.log('Limpiando colecciones...');
        await clearCollections();

        console.log('Insertando categorías...');
        const categoryModels = await insertCategories();
        console.log('Insertando subcategorías...');
        const subcategoryModels = await insertSubcategories(categoryModels);
        console.log('Insertando productos...');
        const productModels = await insertProducts(categoryModels, subcategoryModels);
        console.log('Insertando pedidos...');
        await insertOrders(productModels);

        console.log('Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    } finally {
        await mongoose.disconnect();
    }
};

seedData();