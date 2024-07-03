import mongoose from 'mongoose';
import { CategoryModel } from '../models/category.model';
import { Product } from '../models/product.model';
import Subcategory from '../models/subcategory.model';
import { envs } from '../../../config';
import { MongoDatabase } from '../init';

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
        const subcategoryContainers = new Subcategory({ name: 'Recipientes', description: 'Recipientes para anchetas', category: categoryDecoration._id });
        const subcategoryBalloons = new Subcategory({ name: 'Globos', description: 'Globos decorativos', category: categoryDecoration._id });
        const subcategoryChocolates = new Subcategory({ name: 'Chocolates', description: 'Chocolates y bombones', category: categoryFood._id });
        const subcategoryCheeses = new Subcategory({ name: 'Quesos', description: 'Variedad de quesos', category: categoryFood._id });
        const subcategoryWines = new Subcategory({ name: 'Vinos', description: 'Vinos y espumantes', category: categoryDrinks._id });
        const subcategoryCards = new Subcategory({ name: 'Tarjetas', description: 'Tarjetas con mensajes personalizados', category: categoryMessages._id });

        // Productos
        const productWoodenBasket = new Product({
            name: 'Canasta de Madera',
            description: 'Canasta de madera natural para anchetas',
            price: 32000,
            container: { type: 'Canasta', material: 'Madera', color: 'Natural', size: 'Mediana' },
            contents: [],
            decorations: [],
            customized: false,
            images: ['canasta-madera.jpg'],
            category: categoryDecoration._id,
            subcategory: subcategoryContainers._id,
        });

        const productBirthdayBalloons = new Product({
            name: 'Globos Feliz Cumpleaños',
            description: 'Globos decorativos con mensaje "Feliz Cumpleaños"',
            price: 25000,
            container: { type: 'Paquete', material: 'Plástico', color: 'Transparente', size: 'Pequeño' },
            contents: [{ type: 'Globos', item: 'Globos Feliz Cumpleaños', quantity: 5 }],
            decorations: [],
            customized: false,
            images: ['globos-feliz-cumpleanos.jpg'],
            category: categoryDecoration._id,
            subcategory: subcategoryBalloons._id,
        });

        const productAssortedChocolates = new Product({
            name: 'Chocolates Finos Surtidos',
            description: 'Caja de chocolates finos surtidos',
            price: 62000,
            container: { type: 'Caja', material: 'Cartón', color: 'Marrón', size: 'Mediana' },
            contents: [
                { type: 'Chocolates', item: 'Trufas de Chocolate', quantity: 8 },
                { type: 'Chocolates', item: 'Bombones Rellenos', quantity: 10 },
            ],
            decorations: [{ type: 'Lazo', color: 'Dorado' }],
            customized: false,
            images: ['chocolates-finos-surtidos.jpg'],
            category: categoryFood._id,
            subcategory: subcategoryChocolates._id,
        });

        const productCheeseBoard = new Product({
            name: 'Tabla de Quesos',
            description: 'Tabla con variedad de quesos finos',
            price: 75000,
            container: { type: 'Tabla', material: 'Madera', color: 'Natural', size: 'Grande' },
            contents: [
                { type: 'Queso', item: 'Queso Brie', quantity: 1 },
                { type: 'Queso', item: 'Queso Cheddar', quantity: 1 },
                { type: 'Queso', item: 'Queso Azul', quantity: 1 },
            ],
            decorations: [],
            customized: false,
            images: ['tabla-quesos.jpg'],
            category: categoryFood._id,
            subcategory: subcategoryCheeses._id,
        });

        const productRedWine = new Product({
            name: 'Vino Tinto Reserva',
            description: 'Botella de vino tinto reserva',
            price: 50000,
            container: { type: 'Botella', material: 'Vidrio', color: 'Verde', size: 'Estándar' },
            contents: [{ type: 'Vino', item: 'Vino Tinto Reserva', quantity: 1 }],
            decorations: [],
            customized: false,
            images: ['vino-tinto.jpg'],
            category: categoryDrinks._id,
            subcategory: subcategoryWines._id,
        });

        const productBirthdayCard = new Product({
            name: 'Tarjeta de Cumpleaños',
            description: 'Tarjeta con mensaje personalizado de cumpleaños',
            price: 12000,
            container: { type: 'Sobre', material: 'Papel', color: 'Blanco', size: 'Pequeño' },
            contents: [{ type: 'Tarjeta', item: 'Tarjeta de Cumpleaños', quantity: 1 }],
            decorations: [],
            customized: true,
            images: ['tarjeta-cumpleanos.jpg'],
            category: categoryMessages._id,
            subcategory: subcategoryCards._id,
        });

        // Guardar datos en la base de datos
        await categoryDecoration.save();
        await categoryFood.save();
        await categoryDrinks.save();
        await categoryMessages.save();

        await subcategoryContainers.save();
        await subcategoryBalloons.save();
        await subcategoryChocolates.save();
        await subcategoryCheeses.save();
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
