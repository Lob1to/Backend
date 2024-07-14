export const categories = [
    { name: 'Decoración', description: 'Elementos decorativos para anchetas' },
    { name: 'Comida', description: 'Elementos comestibles para anchetas' },
    { name: 'Bebidas', description: 'Bebidas para anchetas' },
    { name: 'Mensajes', description: 'Tarjetas y mensajes personalizados' }
];

export const subcategories = [
    { name: 'Recipientes', description: 'Recipientes para anchetas', categoryName: 'Decoración' },
    { name: 'Globos', description: 'Globos decorativos', categoryName: 'Decoración' },
    { name: 'Chocolates', description: 'Chocolates y bombones', categoryName: 'Comida' },
    { name: 'Quesos', description: 'Variedad de quesos', categoryName: 'Comida' },
    { name: 'Vinos', description: 'Vinos y espumantes', categoryName: 'Bebidas' },
    { name: 'Tarjetas', description: 'Tarjetas con mensajes personalizados', categoryName: 'Mensajes' }
];

export const products = [
    {
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
        categoryName: 'Decoración',
        subcategoryName: 'Recipientes',
    },
    {
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
        categoryName: 'Decoración',
        subcategoryName: 'Globos',
    },
    {
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
        categoryName: 'Comida',
        subcategoryName: 'Chocolates',
    },
    {
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
        categoryName: 'Comida',
        subcategoryName: 'Quesos',
    },
    {
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
        categoryName: 'Bebidas',
        subcategoryName: 'Vinos',
    },
    {
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
        categoryName: 'Mensajes',
        subcategoryName: 'Tarjetas',
    }
];

export const orders = [
    {
        userId: "60d5ecb54f5679001f9b2d1a",
        items: [
            {
                productName: "Canasta de Madera",
                quantity: 1,
                price: 32000
            },
            {
                productName: "Chocolates Finos Surtidos",
                quantity: 1,
                price: 62000,
                variant: "Mediana"
            }
        ],
        totalPrice: 94000,
        shippingAddress: {
            phone: "+573001234567",
            street: "Calle 123 #45-67",
            city: "Bogotá",
            state: "Cundinamarca",
            postalCode: "110111",
            country: "Colombia"
        },
        paymentMethod: "creditCard",
        orderTotal: {
            subtotal: 94000,
            discount: 0,
            total: 94000
        },
        orderStatus: "pending",
        trackingUrl: "https://tracking.example.com/order123"
    },
    {
        userId: "60d5ecb54f5679001f9b2d1b",
        items: [
            {
                productName: "Vino Tinto Reserva",
                quantity: 2,
                price: 50000
            },
            {
                productName: "Tabla de Quesos",
                quantity: 1,
                price: 75000
            }
        ],
        totalPrice: 175000,
        shippingAddress: {
            phone: "+573009876543",
            street: "Carrera 45 #67-89",
            city: "Medellín",
            state: "Antioquia",
            postalCode: "050021",
            country: "Colombia"
        },
        paymentMethod: "pse",
        orderTotal: {
            subtotal: 175000,
            discount: 10000,
            total: 165000
        },
        orderStatus: "processing",
        trackingUrl: "https://tracking.example.com/order456"
    }
];
