import mongoose from 'mongoose';
import { CategoryModel } from '../models/category.model';
import { ProductModel as Product } from '../models/product.model';
import { SubcategoryModel as Subcategory } from '../models/subcategory.model';
import { MongoDatabase } from '../init';
import { envs } from '../../../config';

const seedData = async () => {
    try {
        await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoUrl: envs.MONGO_URL });

        // Limpiar colecciones existentes
        await CategoryModel.deleteMany({});
        await Product.deleteMany({});
        await Subcategory.deleteMany({});

        // Categorías
        const categoryDecoration = new CategoryModel({ name: 'Decoración', description: 'Elementos decorativos para anchetas' });
        const categoryFood = new CategoryModel({ name: 'Comida', description: 'Elementos comestibles para anchetas' });
        const categoryDrinks = new CategoryModel({ name: 'Bebidas', description: 'Bebidas para anchetas' });
        const categoryMessages = new CategoryModel({ name: 'Mensajes', description: 'Tarjetas y mensajes personalizados' });

        // Subcategorías
        const subcategoryContainers = new Subcategory({ name: 'Recipientes', description: 'Recipientes para anchetas', categoryId: categoryDecoration._id });
        const subcategoryBalloons = new Subcategory({ name: 'Globos', description: 'Globos decorativos', categoryId: categoryDecoration._id });
        const subcategoryChocolates = new Subcategory({ name: 'Chocolates', description: 'Chocolates y bombones', categoryId: categoryFood._id });
        const subcategoryCheeseBoard = new Subcategory({ name: 'Quesos', description: 'Variedad de quesos', categoryId: categoryFood._id });
        const subcategoryWines = new Subcategory({ name: 'Vinos', description: 'Vinos y espumantes', categoryId: categoryDrinks._id });
        const subcategoryCards = new Subcategory({ name: 'Tarjetas', description: 'Tarjetas con mensajes personalizados', categoryId: categoryMessages._id });

        // Productos
        const productWoodenBasket = new Product({
            name: 'Canasta de Madera',
            description: 'Canasta de madera natural para anchetas',
            price: 32000,
            stock: 10,
            variants: [],
            container: { type: 'Canasta', material: 'Madera', color: 'Natural', size: 'Mediana' },
            contents: [],
            decorations: [],
            customized: false,
            images: ['canasta-madera.jpg'],
            categoryId: categoryDecoration._id,
            subcategoryId: subcategoryContainers._id,
        });

        const productBirthdayBalloons = new Product({
            name: 'Globos Feliz Cumpleaños',
            description: 'Globos decorativos con mensaje "Feliz Cumpleaños"',
            price: 25000,
            stock: 20,
            variants: [],
            container: { type: 'Paquete', material: 'Plástico', color: 'Transparente', size: 'Pequeño' },
            contents: [{ type: 'Globos', item: 'Globos Feliz Cumpleaños', quantity: 5 }],
            decorations: [],
            customized: false,
            images: ['globos-feliz-cumpleanos.jpg'],
            categoryId: categoryDecoration._id,
            subcategoryId: subcategoryBalloons._id,
        });

        const productAssortedChocolates = new Product({
            name: 'Chocolates Finos Surtidos',
            description: 'Caja de chocolates finos surtidos',
            price: 62000,
            stock: 15,
            variants: [
                { price: 62000, stock: 10, size: 'Mediana', color: 'Marrón' },
                { price: 75000, stock: 5, size: 'Grande', color: 'Marrón' },
            ],
            container: { type: 'Caja', material: 'Cartón', color: 'Marrón', size: 'Mediana' },
            contents: [
                { type: 'Chocolates', item: 'Trufas de Chocolate', quantity: 8 },
                { type: 'Chocolates', item: 'Bombones Rellenos', quantity: 10 },
            ],
            decorations: [{ type: 'Lazo', color: 'Dorado' }],
            customized: false,
            images: ['chocolates-finos-surtidos.jpg'],
            categoryId: categoryFood._id,
            subcategoryId: subcategoryChocolates._id,
        });

        const productCheeseBoard = new Product({
            name: 'Tabla de Quesos',
            description: 'Tabla con variedad de quesos finos',
            price: 75000,
            stock: 8,
            variants: [],
            container: { type: 'Tabla', material: 'Madera', color: 'Natural', size: 'Grande' },
            contents: [
                { type: 'Queso', item: 'Queso Brie', quantity: 1 },
                { type: 'Queso', item: 'Queso Cheddar', quantity: 1 },
                { type: 'Queso', item: 'Queso Azul', quantity: 1 },
            ],
            decorations: [],
            customized: false,
            images: ['tabla-quesos.jpg'],
            categoryId: categoryFood._id,
            subcategoryId: subcategoryCheeseBoard._id,
        });

        const productRedWine = new Product({
            name: 'Vino Tinto Reserva',
            description: 'Botella de vino tinto reserva',
            price: 50000,
            stock: 25,
            variants: [],
            container: { type: 'Botella', material: 'Vidrio', color: 'Verde', size: 'Estándar' },
            contents: [{ type: 'Vino', item: 'Vino Tinto Reserva', quantity: 1 }],
            decorations: [],
            customized: false,
            images: ['vino-tinto.jpg'],
            categoryId: categoryDrinks._id,
            subcategoryId: subcategoryWines._id,
        });

        const productBirthdayCard = new Product({
            name: 'Tarjeta de Cumpleaños',
            description: 'Tarjeta con mensaje personalizado de cumpleaños',
            price: 12000,
            stock: 30,
            variants: [],
            container: { type: 'Sobre', material: 'Papel', color: 'Blanco', size: 'Pequeño' },
            contents: [{ type: 'Tarjeta', item: 'Tarjeta de Cumpleaños', quantity: 1 }],
            decorations: [],
            customized: true,
            images: ['tarjeta-cumpleanos.jpg'],
            categoryId: categoryMessages._id,
            subcategoryId: subcategoryCards._id,
        });

        // Guardar datos en la base de datos
        await categoryDecoration.save();
        await categoryFood.save();
        await categoryDrinks.save();
        await categoryMessages.save();

        await subcategoryContainers.save();
        await subcategoryBalloons.save();
        await subcategoryChocolates.save();
        await subcategoryCheeseBoard.save();
        await subcategoryWines.save();
        await subcategoryCards.save();

        await productWoodenBasket.save();
        await productBirthdayBalloons.save();
        await productAssortedChocolates.save();
        await productCheeseBoard.save();
        await productRedWine.save();
        await productBirthdayCard.save();

        console.log('Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
