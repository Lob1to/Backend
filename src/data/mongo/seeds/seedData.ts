export const users = [
    {
        name: "John Doe",
        email: "john@example.com",
        emailValidated: true,
        password: "hashedpassword123",
        role: "USER_ROLE",
        img: "john.jpg"
    },
    {
        name: "Admin User",
        email: "admin@example.com",
        emailValidated: true,
        password: "hashedpassword456",
        role: "ADMIN_ROLE",
        img: "admin.jpg"
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        emailValidated: true,
        password: "hashedpassword789",
        role: "USER_ROLE",
        img: "jane.jpg"
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
        emailValidated: false,
        password: "hashedpassword101",
        role: "USER_ROLE",
        img: "bob.jpg"
    }
];

export const categories = [
    { name: "Decoración", description: "Elementos decorativos para anchetas" },
    { name: "Comida", description: "Elementos comestibles para anchetas" },
    { name: "Bebidas", description: "Bebidas para anchetas" },
    { name: "Mensajes", description: "Tarjetas y mensajes personalizados" },
    { name: "Flores", description: "Arreglos florales para anchetas" },
    { name: "Regalos", description: "Artículos de regalo para anchetas" },
    { name: "Dulces", description: "Dulces y golosinas para anchetas" },
    { name: "Accesorios", description: "Accesorios decorativos para anchetas" }
];

export const subcategories = [
    { name: "Recipientes", description: "Recipientes para anchetas" },
    { name: "Globos", description: "Globos decorativos" },
    { name: "Chocolates", description: "Chocolates y bombones" },
    { name: "Quesos", description: "Variedad de quesos" },
    { name: "Vinos", description: "Vinos y espumantes" },
    { name: "Tarjetas", description: "Tarjetas con mensajes personalizados" },
    { name: "Rosas", description: "Rosas de diferentes colores" },
    { name: "Peluches", description: "Peluches de diferentes tamaños" },
    { name: "Gourmet", description: "Productos gourmet selectos" },
    { name: "Frutas", description: "Frutas frescas y secas" },
    { name: "Cintas", description: "Cintas decorativas" },
    { name: "Licores", description: "Licores premium" }
];

export const variantTypes = [
    { name: "Size", type: "string" },
    { name: "Color", type: "string" },
    { name: "Material", type: "string" },
    { name: "Flavor", type: "string" },
    { name: "Weight", type: "number" },
    { name: "Quantity", type: "number" }
];

export const products = [
    {
        name: "Canasta de Madera",
        description: "Canasta de madera natural para anchetas",
        price: 32000,
        stock: 10,
        images: [{ image: 1, url: "canasta-madera.jpg" }]
    },
    {
        name: "Globos Feliz Cumpleaños",
        description: 'Globos decorativos con mensaje "Feliz Cumpleaños"',
        price: 25000,
        stock: 20,
        images: [{ image: 1, url: "globos-feliz-cumpleanos.jpg" }]
    },
    {
        name: "Chocolates Finos Surtidos",
        description: "Caja de chocolates finos surtidos",
        price: 62000,
        stock: 15,
        images: [{ image: 1, url: "chocolates-finos-surtidos.jpg" }]
    },
    {
        name: "Vino Tinto Reserva",
        description: "Botella de vino tinto reserva",
        price: 85000,
        stock: 25,
        images: [{ image: 1, url: "vino-tinto-reserva.jpg" }]
    },
    {
        name: "Ramo de Rosas Rojas",
        description: "Hermoso ramo de 12 rosas rojas",
        price: 70000,
        stock: 30,
        images: [{ image: 1, url: "ramo-rosas-rojas.jpg" }]
    },
    {
        name: "Peluche Oso Grande",
        description: "Peluche de oso grande y suave",
        price: 55000,
        stock: 18,
        images: [{ image: 1, url: "peluche-oso-grande.jpg" }]
    },
    {
        name: "Caja Gourmet Deluxe",
        description: "Caja con selección de productos gourmet",
        price: 120000,
        stock: 12,
        images: [{ image: 1, url: "caja-gourmet-deluxe.jpg" }]
    },
    {
        name: "Tarjeta Personalizada",
        description: "Tarjeta con mensaje personalizado",
        price: 15000,
        stock: 50,
        images: [{ image: 1, url: "tarjeta-personalizada.jpg" }]
    }
];

export const variants = [
    { price: 32000, stock: 10 },
    { price: 25000, stock: 20 },
    { price: 62000, stock: 15 },
    { price: 85000, stock: 25 },
    { price: 70000, stock: 30 },
    { price: 55000, stock: 18 },
    { price: 120000, stock: 12 },
    { price: 15000, stock: 50 }
];

export const coupons = [
    {
        couponCode: "SUMMER10",
        discountType: "percentage",
        discountAmount: 10,
        minimumPurchaseAmount: 50000,
        endDate: new Date("2023-12-31"),
        status: "active"
    },
    {
        couponCode: "WELCOME20",
        discountType: "fixed",
        discountAmount: 20000,
        minimumPurchaseAmount: 100000,
        endDate: new Date("2023-12-31"),
        status: "active"
    },
    {
        couponCode: "FLASH25",
        discountType: "percentage",
        discountAmount: 25,
        minimumPurchaseAmount: 150000,
        endDate: new Date("2023-08-31"),
        status: "active"
    },
    {
        couponCode: "FREESHIP",
        discountType: "fixed",
        discountAmount: 15000,
        minimumPurchaseAmount: 80000,
        endDate: new Date("2023-12-31"),
        status: "active"
    }
];

export const orders = [
    {
        orderStatus: "pending",
        items: [{ quantity: 1 }, { quantity: 2 }],
        totalPrice: 119000,
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
            subtotal: 119000,
            discount: 0,
            total: 119000
        },
        trackingUrl: "https://tracking.example.com/order123"
    },
    {
        orderStatus: "processing",
        items: [{ quantity: 1 }, { quantity: 1 }],
        totalPrice: 87000,
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
            subtotal: 87000,
            discount: 8700,
            total: 78300
        },
        trackingUrl: "https://tracking.example.com/order456"
    },
    {
        orderStatus: "shipped",
        items: [{ quantity: 1 }, { quantity: 1 }, { quantity: 1 }],
        totalPrice: 167000,
        shippingAddress: {
            phone: "+573005555555",
            street: "Avenida 78 #90-12",
            city: "Cali",
            state: "Valle del Cauca",
            postalCode: "760001",
            country: "Colombia"
        },
        paymentMethod: "creditCard",
        orderTotal: {
            subtotal: 167000,
            discount: 16700,
            total: 150300
        },
        trackingUrl: "https://tracking.example.com/order789"
    }
];
