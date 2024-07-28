
export const authErrors = {

    missingEmail: {
        message: 'No se ha proporcionado un correo electrónico',
        code: 'missing-email',
    },

    invalidEmail: {
        message: 'El correo ingresado no es valido',
        code: 'invalid-email',
    },

    missingPassword: {
        message: 'No se ha proporcionado una contraseña',
        code: 'missing-password',
    },

    shortPassword: {
        message: 'La contraseña es muy corta',
        code: 'short-password',
    },

    longPassword: {
        message: 'La contraseña es muy larga',
        code: 'long-password',
    },

    missingName: {
        message: 'No se ha proporcionado el nombre',
        code: 'missing-name',
    },

    invalidPassword: {
        message: 'La contraseña ingresada debe tener por lo menos 1 letra mayúscula, 1 letra minúscula y 1 número',
        code: 'invalid-password',
    },

    incorrectPassword: {
        message: 'La contraseña ingresada no es correcta',
        code: 'incorrect-password',
    },

    noFieldToUpdate: {
        message: 'No se puede actualizar un usuario si no se proporciona ningún parámetro',
        code: 'no-field-to-update',
    },

    missingId: {
        message: 'No se ha proporcionado una ID',
        code: 'missing-id',
    },

    invalidImg: {
        message: 'La imagen ingresada no es valida',
        code: 'invalid-img',
    },

    missingEmailValidated: {
        message: 'No se ha proporcionado el estado de validación del email',
        code: 'missing-email-validated',
    },

    missingRole: {
        message: 'No se ha proporcionado el rol del usuario',
        code: 'missing-role',
    },

    unknownError: {
        message: 'Ha ocurrido un error inesperado en el proceso de autenticación',
        code: 'unknown-error',
    },

    tokenGenerationError: {
        message: 'Ha ocurrido un error al generar el token de autenticación',
        code: 'server-error',
    },

    sendEmailError: {
        message: 'Ha ocurrido un error al enviar el correo electrónico de verificación',
        code: 'server-error',
    },

    emailAlreadyInUse: {
        message: 'El correo ya existe en la base de datos',
        code: 'email-already-in-use',
    },

    invalidToken: {
        message: 'El token ingresado no es valido',
        code: 'invalid-token',
    },

    invalidTokenData: {
        message: 'El token ingresado no tiene los datos correctos',
        code: 'invalid-token-data',
    },

    userNotFound: {
        message: 'El usuario no existe en la base de datos',
        code: 'user-not-found',
    },

    invalidCredentials: {
        message: 'El correo electrónico o la contraseña ingresados son incorrectos',
        code: 'invalid-credentials',
    },

    invalidId: {
        message: 'La ID proporcionada no es valida',
        code: 'invalid-id',
    },

    missingToken: {
        message: 'No se ha proporcionado un token',
        code: 'missing-token',
    }

}

export const categoryErrors = {

    missingName: {
        message: 'No se ha proporcionado el nombre de la categoría',
        code: 'missing-name',
    },

    tooLongDescription: {
        message: 'La descripción de la categoría es muy larga, no puede superar los 100 caracteres',
        code: 'too-long-description',
    },

    invalidId: {
        message: 'La ID de categoría proporcionada no es válida',
        code: 'invalid-id',
    },

    invalidImg: {
        message: 'La imagen ingresada no es valida',
        code: 'invalid-img',
    },


    categoryAlreadyExist: {
        message: 'La categoría ya existe en la base de datos',
        code: 'category-already-exist',
    },

    categoryNotFound: {
        message: 'La categoría no existe en la base de datos',
        code: 'category-not-found',
    }

}

export const subcategoryErrors = {

    missingName: {
        message: 'No se ha proporcionado el nombre de la subcategoría',
        code: 'missing-name',
    },

    missingDescription: {
        message: 'No se ha proporcionado la descripción de la subcategoría',
        code: 'missing-description',
    },

    tooLongDescription: {
        message: 'La descripción de la subcategoría es muy larga, no puede superar los 100 caracteres',
        code: 'too-long-description',
    },

    missingCategoryId: {
        message: 'No se ha proporcionado la categoría a la que pertenece la subcategoría',
        code: 'missing-category-id',
    },

    invalidCategoryId: {
        message: 'La ID de categoría proporcionada no es válida',
        code: 'invalid-id',
    },

    subcategoryAlreadyExist: {
        message: 'La subcategoría ya existe en la base de datos',
        code: 'subcategory-already-exist',
    },

    missingId: {
        message: 'No se ha proporcionado una ID',
        code: 'missing-id',
    },

    subcategoryNotFound: {
        message: 'La subcategoría no existe en la base de datos',
        code: 'subcategory-not-found',
    },

    categoryNotFound: {
        message: 'La categoría no existe en la base de datos',
        code: 'category-not-found',
    },
}

export const variantTypesErrors = {

    variantTypeAlreadyExist: {
        message: 'El tipo de variante ya existe en la base de datos',
        code: 'variant-type-already-exist',
    },

    missingName: {
        message: 'No se ha proporcionado el nombre del tipo de variante',
        code: 'missing-name',
    },

    missingType: {
        message: 'No se ha proporcionado el tipo de variante',
        code: 'missing-type',
    },

    invalidName: {
        message: 'El nombre del tipo de variante no es válido',
        code: 'invalid-name',
    },

    invalidType: {
        message: 'El tipo de variante no es válido',
        code: 'invalid-type',
    },

    variantTypeNotFound: {
        message: 'El tipo de variante no existe en la base de datos',
        code: 'variant-type-not-found',
    }

}

export const variantsErrors = {

    missingPrice: {
        message: 'No se ha proporcionado el precio de la variante',
        code: 'missing-price',
    },

    missingStock: {
        message: 'No se ha proporcionado el stock de la variante',
        code: 'missing-stock',
    },

    missingVariantType: {
        message: 'No se ha proporcionado el tipo de variante de la variante',
        code: 'missing-variant-type',
    },

    invalidStock: {
        message: 'El stock de la variante no es válido',
        code: 'invalid-stock',
    },

    invalidPrice: {
        message: 'El precio de la variante no es válido',
        code: 'invalid-price',
    },

    variantAlreadyExist: {
        message: 'La variante ya existe en la base de datos',
        code: 'variant-already-exist',
    },

    variantNotFound: {
        message: 'La variante no existe en la base de datos',
        code: 'variant-not-found',
    },

    invalidVariantTypeId: {
        message: 'La ID del tipo de variante proporcionada no es válida',
        code: 'invalid-variant-type-id',
    }


}

export const productsErrors = {

    missingName: {
        message: 'No se ha proporcionado el nombre del producto',
        code: 'missing-name',
    },

    missingDescription: {
        message: 'No se ha proporcionado la descripción del producto',
        code: 'missing-description',
    },

    tooLongDescription: {
        message: 'La descripción del producto es muy larga, no puede superar los 100 caracteres',
        code: 'too-long-description',
    },

    missingPrice: {
        message: 'No se ha proporcionado el precio del producto',
        code: 'missing-price',
    },

    invalidPrice: {
        message: 'El precio del producto debe ser un número válido mayor a 0',
        code: 'invalid-price',
    },

    missingStock: {
        message: 'No se ha proporcionado el stock del producto',
        code: 'missing-stock',
    },

    invalidStock: {
        message: 'El stock del producto debe ser un número entero válido',
        code: 'invalid-stock',
    },

    invalidVariants: {
        message: 'Las variantes del producto deben ser una lista de objetos válidos',
        code: 'invalid-variants',
    },

    missingImages: {
        message: 'No se ha proporcionado las imágenes del producto',
        code: 'missing-images',
    },

    invalidImages: {
        message: 'Las imágenes del producto deben ser una lista de URLs válidas',
        code: 'invalid-images',
    },

    missingCategoryId: {
        message: 'No se ha proporcionado la categoría a la que pertenece el producto',
        code: 'missing-category-id',
    },

    invalidCategoryId: {
        message: 'La ID de categoría proporcionada para el producto no es válida',
        code: 'invalid-category-id',
    },

    missingSubcategoryId: {
        message: 'No se ha proporcionado la subcategoría a la que pertenece el producto',
        code: 'missing-subcategory-id',
    },

    invalidSubcategoryId: {
        message: 'La ID de subcategoría proporcionada para el producto no es válida',
        code: 'invalid-subcategory-id',
    },

    productAlreadyExist: {
        message: 'El producto ya existe en la base de datos',
        code: 'product-already-exist',
    },

    productNotFound: {
        message: 'El producto no existe en la base de datos',
        code: 'product-not-found',
    },

    invalidPriceParameters: {
        message: 'El maximo precio debe ser mayor al minimo',
        code: 'invalid-price-parameters',
    }
}

export const fileUploadErrors = {

    missingImgName: {
        message: 'No se ha proporcionado el nombre de la imagen',
        code: 'missing-img-name',
    },

    tooManyFiles: {
        message: 'No se pueden subir más de 5 imágenes',
        code: 'too-many-files',
    },

    missingImg: {
        message: 'No se ha proporcionado ninguna imagen',
        code: 'missing-img',
    },

    invalidImgSize: {
        message: (maxFileSize: number) => `El tamaño de la imagen excede el límite permitido (${(maxFileSize / 1024) / 1024} MB)`,
        code: 'invalid-img-size',
    },

    invalidImgType: {
        message: (types: string[]) => `El tipo de imagen no es válido, solo se permite los tipos: ${types}`,
        code: 'invalid-img-type',
    },

    invalidImgFormat: {
        message: 'El formato de la imagen no es válido o está corrupto',
        code: 'invalid-img-format',
    },

    invalidImgName: {
        message: 'El nombre de la imagen no es válido',
        code: 'invalid-img-name',
    },

    invalidImgExtension: {
        message: (fileExtension: string, validExtensions: string[]) => `Extensión invalida: ${fileExtension}, extensiones validas: ${validExtensions}`,
        code: 'invalid-img-extension',
    },

    imageNotFound: {
        message: 'La imagen no existe en la base de datos',
        code: 'image-not-found',
    },



}


export const orderErrors = {

    userNotFound: {
        message: 'El usuario no existe en la base de datos',
        code: 'user-not-found',
    },

    missingUserId: {
        message: 'No se ha proporcionado el ID del usuario',
        code: 'missing-user-id',
    },

    invalidUserId: {
        message: 'El ID del usuario proporcionado no es válido',
        code: 'invalid-user-id',
    },

    invalidOrderId: {
        message: 'El ID del pedido proporcionado no es válido',
        code: 'invalid-order-id',
    },

    invalidOrderStatus: {
        message: 'El estado del pedido no es válido',
        code: 'invalid-order-status',
    },

    missingItems: {
        message: 'No se ha proporcionado ningún item',
        code: 'missing-items',
    },

    invalidItems: {
        message: 'Los items del pedido deben ser una lista de objetos válidos',
        code: 'invalid-items',
    },

    missingTotalPrice: {
        message: 'No se ha proporcionado el precio total del pedido',
        code: 'missing-total-price',
    },

    invalidTotalPrice: {
        message: 'El precio total del pedido debe ser un número válido mayor a 0',
        code: 'invalid-total-price',
    },

    missingShippingAddress: {
        message: 'No se ha proporcionado la dirección de envío del pedido',
        code: 'missing-shipping-address',
    },

    invalidShippingAddress: {
        message: 'La dirección de envío del pedido debe ser un objeto válido',
        code: 'invalid-shipping-address',
    },

    missingPaymentMethod: {
        message: 'No se ha proporcionado el método de pago del pedido',
        code: 'missing-payment-method',
    },

    invalidPaymentMethod: {
        message: 'El método de pago del pedido debe ser un objeto válido',
        code: 'invalid-payment-method',
    },

    invalidCouponCode: {
        message: 'El código de cupón no es válido',
        code: 'invalid-coupon-code',
    },

    invalidOrderTotal: {
        message: 'El total del pedido debe ser mayor al mínimo',
        code: 'invalid-order-total',
    },

    invalidTrackingUrl: {
        message: 'La URL de seguimiento debe ser una URL válida',
        code: 'invalid-tracking-url',
    },

    ordersNotFound: {
        message: 'Los pedidos no existen en la base de datos',
        code: 'orders-not-found',
    },

    orderNotFound: {
        message: 'El pedido no existe en la base de datos',
        code: 'order-not-found',
    },

    orderAlreadyExist: {
        message: 'El pedido ya existe en la base de datos',
        code: 'order-already-exist',
    },

    orderNotBelongToUser: {
        message: 'El pedido no pertenece al usuario',
        code: 'order-not-belong-to-user',
    },

    productNotFound: {
        message: (productId: string) => `El producto con ID ${productId} no existe en la base de datos`,
        code: 'product-not-found',
    },

    insufficientStock: {
        message: 'No hay stock suficiente para realizar el pedido',
        code: 'insufficient-stock',
    },

    invalidPrice: {
        message: 'El precio del producto es invalido',
        code: 'invalid-price',
    },

}

export const couponErrors = {

    invalidCouponCode: {
        message: 'El código de cupón no es válido',
        code: 'invalid-coupon-code',
    },

    invalidDiscountType: {
        message: (discountTypes: string[]) => `El tipo de descuento no es válido, validos: ${discountTypes.join(', ')}`,
        code: 'invalid-discount-type',
    },

    invalidDiscountAmount: {
        message: 'La cantidad de descuento debe ser un número válido mayor a 0',
        code: 'invalid-discount-amount',
    },

    invalidMinimumPurchaseAmount: {
        message: 'El mínimo de compra debe ser un número válido mayor a 0',
        code: 'invalid-minimum-purchase-amount',
    },

    invalidEndDate: {
        message: 'La fecha de finalización del cupón debe ser una fecha válida',
        code: 'invalid-end-date',
    },

    invalidStatus: {
        message: (statusOptions: string[]) => `El estado del cupón no es válido, solo puede ser: ${statusOptions.join(', ')}`,
        code: 'invalid-status',
    },

    missingDiscountType: {
        message: 'No se ha proporcionado el tipo de descuento',
        code: 'missing-discount-type',
    },

    missingDiscountAmount: {
        message: 'No se ha proporcionado la cantidad de descuento',
        code: 'missing-discount-amount',
    },

    missingMinimumPurchaseAmount: {
        message: 'No se ha proporcionado el mínimo de compra',
        code: 'missing-minimum-purchase-amount',
    },

    missingEndDate: {
        message: 'No se ha proporcionado la fecha de finalización del cupón',
        code: 'missing-end-date',
    },

    missingStatus: {
        message: 'No se ha proporcionado el estado del cupón',
        code: 'missing-status',
    },

    missingCouponCode: {
        message: 'No se ha proporcionado el código del cupón',
        code: 'missing-coupon-code',
    },

    missingProductIds: {
        message: 'No se ha proporcionado ningún ID de producto',
        code: 'missing-product-ids',
    },

    missingPurchaseAmount: {
        message: 'No se ha proporcionado la cantidad de compra',
        code: 'missing-purchase-amount',
    },

    invalidPurchaseAmount: {
        message: 'La cantidad de compra debe ser un número válido mayor a 0',
        code: 'invalid-purchase-amount',
    },

    productNotFound: {
        message: (productId: string) => `El producto con ID ${productId} no existe en la base de datos`,
        code: 'product-not-found',
    },

    couponNotFound: {
        message: 'El cupón no existe en la base de datos',
        code: 'coupon-not-found',
    },

    couponAlreadyExist: {
        message: 'El cupón ya existe en la base de datos',
        code: 'coupon-already-exist',
    },

    invalidCategoryId: {
        message: 'El ID de categoría no es válido',
        code: 'invalid-category-id',
    },

    invalidProductId: {
        message: 'Uno o más IDs de producto no son válidos',
        code: 'invalid-product-ids',
    },

    invalidSubcategoryId: {
        message: 'El ID de subcategoría no es válido',
        code: 'invalid-subcategory-id',
    },

    expiredCoupon: {
        message: 'El cupón ha expirado',
        code: 'expired-coupon',
    },

    inactiveCoupon: {
        message: 'El cupón no está activo',
        code: 'inactive-coupon',
    },

    minimumPurchaseAmountNotReached: {
        message: 'La cantidad de compra debe ser mayor o igual al mínimo de compra',
        code: 'minimum-purchase-amount-not-reached',
    },

    productsNotFound: {
        message: 'Uno o más productos ingresados no existen en la base de datos',
        code: 'products-not-found',
    },

    expiredEndDate: {
        message: 'La fecha de finalización del cupón ha expirado',
        code: 'expired-end-date',
    },

    couponNotApplicable: {
        message: 'El cupón no se aplica a ningún producto',
        code: 'coupon-not-applicable',
    },

}

export const interfacesValidatorsErrors = {

    productVariant: {

        notArray: {
            message: 'El producto debe ser una lista de objetos',
            code: 'not-array',
        },

        noVariants: {
            message: 'No se ha proporcionado ninguna variante',
            code: 'no-variants',
        },

        invalidPrice: {
            message: 'El precio de la variante debe ser un número válido mayor a 0',
            code: 'invalid-price',
        },

        invalidStock: {
            message: 'El stock de la variante debe ser un número válido mayor a 0',
            code: 'invalid-stock',
        },

        invalidSize: {
            message: 'El tamaño de la variante debe ser un número válido mayor a 0',
            code: 'invalid-size',
        },

        invalidColor: {
            message: 'El color de la variante debe ser un número válido mayor a 0',
            code: 'invalid-color',
        }

    },

    orderItem: {

        noItems: {
            message: 'No se ha proporcionado ningún item',
            code: 'no-items',
        },

        invalidProductId: {
            message: 'El ID del producto del item debe ser un número válido mayor a 0',
            code: 'invalid-product-id',
        },

        invalidQuantity: {
            message: 'La cantidad del item debe ser un número válido mayor a 0',
            code: 'invalid-quantity',
        },

        invalidQuantityValue: {
            message: 'La cantidad del item debe ser un número válido mayor a 0',
            code: 'invalid-quantity-value',
        },

        invalidVariant: {
            message: 'La variante del item debe ser un objeto válido',
            code: 'invalid-variant',
        }

    },

    shippingAddress: {

        noAdress: {
            message: 'No se ha proporcionado ninguna dirección',
            code: 'no-address',
        },

        invalidPhone: {
            message: 'El teléfono debe ser un número válido mayor a 0',
            code: 'invalid-phone',
        },

        invalidStreet: {
            message: 'La calle debe ser una cadena de caracteres válida',
            code: 'invalid-street',
        },

        invalidCity: {
            message: 'La ciudad debe ser una cadena de caracteres válida',
            code: 'invalid-city',
        },

        invalidState: {
            message: 'El estado debe ser una cadena de caracteres válida',
            code: 'invalid-state',
        },

        invalidPostalCode: {
            message: 'El código postal debe ser un número válido mayor a 0',
            code: 'invalid-postal-code',
        },

        invalidCountry: {
            message: 'El país debe ser una cadena de caracteres válida',
            code: 'invalid-country',
        },

    },

    orderTotal: {

        noOrderTotal: {
            message: 'No se ha proporcionado el total del pedido',
            code: 'no-order-total',
        },

        invalidSubtotal: {
            message: 'El subtotal debe ser un número válido mayor a 0',
            code: 'invalid-subtotal',
        },

        invalidDiscount: {
            message: 'El descuento debe ser un número válido mayor a 0',
            code: 'invalid-discount',
        },

        invalidTotal: {
            message: 'El total debe ser un número válido mayor a 0',
            code: 'invalid-total',
        },

        invalidSubtotalValue: {
            message: 'El subtotal debe ser un número válido mayor a 0',
            code: 'invalid-subtotal-value',
        },

        invalidDiscountValue: {
            message: 'El descuento debe ser un número válido mayor a 0',
            code: 'invalid-discount-value',
        },

        invalidTotalValue: {
            message: 'El total debe ser un número válido mayor a 0',
            code: 'invalid-total-value',
        }

    },

    url: {

        invalidUrl: {
            message: 'La url debe ser una cadena de caracteres válida',
            code: 'invalid-url',
        }

    }



}

export const sharedErrors = {

    unauthorized: {
        message: 'No tienes permiso para realizar esta acción',
        code: 'unauthorized',
    },

    missingFields: {
        message: 'No se han proporcionado todos los campos',
        code: 'missing-fields',
    },

    invalidBearer: {
        message: 'El Bearer ingresado no es valido',
        code: 'invalid-bearer',
    },

    noFieldToUpdate: {
        message: 'No se puede realizar esta acción si no se proporciona ningún parámetro',
        code: 'no-field-to-update',
    },

    missingId: {
        message: 'No se ha proporcionado una ID',
        code: 'missing-id',
    },

    unknownError: {
        message: 'Ha ocurrido un error inesperado en el servidor',
        code: 'unknown-error',
    },

    invalidId: {
        message: 'La ID proporcionada no es valida',
        code: 'invalid-id',
    },

    invalidParameters: {
        message: 'Los parámetros proporcionados no son válidos',
        code: 'invalid-parameters',
    },

    invalidPage: {
        message: 'La página debe ser un número entero mayor a 0',
        code: 'invalid-page',
    },

    invalidLimit: {
        message: 'El limite debe ser un número entero mayor a 0',
        code: 'invalid-limit',
    },

    invalidImg: {
        message: 'La imagen ingresada no es valida',
        code: 'invalid-img',
    },
}

