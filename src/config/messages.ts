
export const authErrors = {
    missingEmail: {
        message: 'Por favor, ingresa tu correo electrónico',
        code: 'missing-email',
    },
    invalidEmail: {
        message: 'El correo electrónico no parece ser válido. ¿Podrías revisarlo?',
        code: 'invalid-email',
    },
    missingPassword: {
        message: 'No olvides ingresar tu contraseña',
        code: 'missing-password',
    },
    shortPassword: {
        message: 'Tu contraseña es un poco corta. ¿Podrías hacerla más larga?',
        code: 'short-password',
    },
    longPassword: {
        message: 'Tu contraseña es demasiado larga. ¿Podrías acortarla un poco?',
        code: 'long-password',
    },
    missingName: {
        message: 'Por favor, dinos tu nombre',
        code: 'missing-name',
    },
    invalidPassword: {
        message: 'Tu contraseña debe incluir al menos una mayúscula, una minúscula y un número',
        code: 'invalid-password',
    },
    incorrectPassword: {
        message: 'La contraseña no es correcta. ¿Quieres intentarlo de nuevo?',
        code: 'incorrect-password',
    },
    noFieldToUpdate: {
        message: 'No se ha seleccionado ningún campo para actualizar',
        code: 'no-field-to-update',
    },
    missingId: {
        message: 'Falta un identificador necesario',
        code: 'missing-id',
    },
    invalidImg: {
        message: 'La imagen no es válida. ¿Podrías intentar con otra?',
        code: 'invalid-img',
    },
    missingEmailValidated: {
        message: 'Falta confirmar tu correo electrónico',
        code: 'missing-email-validated',
    },
    missingRole: {
        message: 'No se ha especificado tu tipo de cuenta',
        code: 'missing-role',
    },
    unknownError: {
        message: 'Ups, algo salió mal. Por favor, inténtalo de nuevo más tarde',
        code: 'unknown-error',
    },
    tokenGenerationError: {
        message: 'Hubo un problema al iniciar tu sesión. ¿Podrías intentarlo de nuevo?',
        code: 'token-generation-error',
    },
    sendEmailError: {
        message: 'No pudimos enviar el correo de verificación. ¿Podrías intentarlo más tarde?',
        code: 'send-email-error',
    },
    emailAlreadyInUse: {
        message: 'Este correo ya está registrado. ¿Quieres iniciar sesión?',
        code: 'email-already-in-use',
    },
    invalidToken: {
        message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo',
        code: 'invalid-token',
    },
    invalidTokenData: {
        message: 'Hay un problema con tu sesión. Por favor, inicia sesión de nuevo',
        code: 'invalid-token-data',
    },
    userNotFound: {
        message: 'No encontramos tu cuenta. ¿Quieres crear una nueva?',
        code: 'user-not-found',
    },
    invalidCredentials: {
        message: 'No se ha encontrado una cuenta con ese correo. ¿Quieres intentarlo de nuevo?',
        code: 'invalid-email',
    },
    invalidId: {
        message: 'El identificador proporcionado no es válido',
        code: 'invalid-id',
    },
    missingToken: {
        message: 'Por favor, inicia sesión para continuar',
        code: 'missing-token',
    }
}


export const categoryErrors = {
    missingName: {
        message: 'Por favor, ingresa un nombre para la categoría',
        code: 'category-name-missing',
    },
    tooLongDescription: {
        message: 'La descripción es un poco larga. ¿Podrías acortarla a 100 caracteres?',
        code: 'category-description-long',
    },
    invalidId: {
        message: 'No pudimos encontrar esta categoría. ¿Quieres intentar de nuevo?',
        code: 'category-id-invalid',
    },
    invalidImg: {
        message: 'La imagen de la categoría no es válida. ¿Podrías intentar con otra?',
        code: 'category-image-invalid',
    },
    categoryAlreadyExist: {
        message: 'Esta categoría ya existe. ¿Quieres crear una diferente?',
        code: 'category-name-duplicate',
    },
    categoryNotFound: {
        message: 'No pudimos encontrar esta categoría. ¿Quieres crear una nueva?',
        code: 'category-not-found',
    }
}

export const subcategoryErrors = {
    missingName: {
        message: 'Por favor, ingresa un nombre para la subcategoría',
        code: 'subcategory-name-missing',
    },
    missingDescription: {
        message: 'No olvides agregar una descripción para la subcategoría',
        code: 'subcategory-description-missing',
    },
    tooLongDescription: {
        message: 'La descripción es un poco larga. ¿Podrías acortarla a 100 caracteres?',
        code: 'subcategory-description-long',
    },
    missingCategoryId: {
        message: 'Por favor, selecciona la categoría a la que pertenece esta subcategoría',
        code: 'subcategory-parent-missing',
    },
    invalidCategoryId: {
        message: 'La categoría seleccionada no es válida',
        code: 'subcategory-parent-invalid',
    },
    subcategoryAlreadyExist: {
        message: 'Esta subcategoría ya existe. ¿Quieres crear una diferente?',
        code: 'subcategory-name-duplicate',
    },
    missingId: {
        message: 'No pudimos identificar la subcategoría. ¿Quieres intentar de nuevo?',
        code: 'subcategory-id-missing',
    },
    subcategoryNotFound: {
        message: 'No pudimos encontrar esta subcategoría. ¿Quieres crear una nueva?',
        code: 'subcategory-not-found',
    },
    categoryNotFound: {
        message: 'No pudimos encontrar la categoría asociada. ¿Quieres seleccionar otra?',
        code: 'subcategory-parent-notfound',
    },
}

export const variantTypesErrors = {
    variantTypeAlreadyExist: {
        message: 'Este tipo de variante ya existe. ¿Quieres crear uno diferente?',
        code: 'variant-type-duplicate',
    },
    missingName: {
        message: 'Por favor, ingresa un nombre para el tipo de variante',
        code: 'variant-type-name-missing',
    },
    missingType: {
        message: 'No olvides seleccionar el tipo de variante',
        code: 'variant-type-missing',
    },
    invalidName: {
        message: 'El nombre del tipo de variante no es válido. ¿Podrías revisarlo?',
        code: 'variant-type-name-invalid',
    },
    invalidType: {
        message: 'El tipo de variante seleccionado no es válido',
        code: 'variant-type-invalid',
    },
    variantTypeNotFound: {
        message: 'No pudimos encontrar este tipo de variante. ¿Quieres crear uno nuevo?',
        code: 'variant-type-not-found',
    }
}

export const variantsErrors = {
    missingPrice: {
        message: 'Por favor, ingresa el precio de la variante',
        code: 'variant-price-missing',
    },
    missingStock: {
        message: 'No olvides ingresar el stock disponible de la variante',
        code: 'variant-stock-missing',
    },
    missingVariantType: {
        message: 'Por favor, selecciona el tipo de variante',
        code: 'variant-type-missing',
    },
    invalidStock: {
        message: 'El stock ingresado no es válido. ¿Podrías revisarlo?',
        code: 'variant-stock-invalid',
    },
    invalidPrice: {
        message: 'El precio ingresado no es válido. ¿Podrías revisarlo?',
        code: 'variant-price-invalid',
    },
    variantAlreadyExist: {
        message: 'Esta variante ya existe. ¿Quieres crear una diferente?',
        code: 'variant-duplicate',
    },
    variantNotFound: {
        message: 'No pudimos encontrar esta variante. ¿Quieres crear una nueva?',
        code: 'variant-not-found',
    },
    invalidVariantTypeId: {
        message: 'El tipo de variante seleccionado no es válido',
        code: 'variant-type-id-invalid',
    }
}

export const productsErrors = {
    missingName: {
        message: 'Por favor, ingresa un nombre para el producto',
        code: 'product-name-missing',
    },
    missingDescription: {
        message: 'No olvides agregar una descripción para el producto',
        code: 'product-description-missing',
    },
    tooLongDescription: {
        message: 'La descripción es un poco larga. ¿Podrías acortarla a 100 caracteres?',
        code: 'product-description-long',
    },
    missingPrice: {
        message: 'Por favor, ingresa el precio del producto',
        code: 'product-price-missing',
    },
    invalidPrice: {
        message: 'El precio debe ser mayor a 0. ¿Podrías revisarlo?',
        code: 'product-price-invalid',
    },
    missingStock: {
        message: 'No olvides ingresar el stock disponible del producto',
        code: 'product-stock-missing',
    },
    invalidStock: {
        message: 'El stock debe ser un número entero. ¿Podrías revisarlo?',
        code: 'product-stock-invalid',
    },
    invalidVariants: {
        message: 'Las variantes del producto no son válidas. ¿Podrías revisarlas?',
        code: 'product-variants-invalid',
    },
    missingImages: {
        message: 'No olvides agregar imágenes del producto',
        code: 'product-images-missing',
    },
    invalidImages: {
        message: 'Las imágenes del producto no son válidas. ¿Podrías revisarlas?',
        code: 'product-images-invalid',
    },
    missingCategoryId: {
        message: 'Por favor, selecciona la categoría del producto',
        code: 'product-category-missing',
    },
    invalidCategoryId: {
        message: 'La categoría seleccionada no es válida',
        code: 'product-category-invalid',
    },
    missingSubcategoryId: {
        message: 'Por favor, selecciona la subcategoría del producto',
        code: 'product-subcategory-missing',
    },
    invalidSubcategoryId: {
        message: 'La subcategoría seleccionada no es válida',
        code: 'product-subcategory-invalid',
    },
    productAlreadyExist: {
        message: 'Este producto ya existe. ¿Quieres crear uno diferente?',
        code: 'product-duplicate',
    },
    productNotFound: {
        message: 'No pudimos encontrar este producto. ¿Quieres crear uno nuevo?',
        code: 'product-not-found',
    },
    invalidPriceParameters: {
        message: 'El precio máximo debe ser mayor al mínimo. ¿Podrías revisarlo?',
        code: 'product-price-range-invalid',
    }
}

export const fileUploadErrors = {
    missingImgName: {
        message: 'Por favor, ingresa un nombre para la imagen',
        code: 'file-name-missing',
    },
    tooManyFiles: {
        message: 'Solo puedes subir hasta 5 imágenes. ¿Podrías seleccionar menos?',
        code: 'file-count-exceeded',
    },
    missingImg: {
        message: 'No olvides seleccionar una imagen para subir',
        code: 'file-missing',
    },
    invalidImgSize: {
        message: (maxFileSize: number) => `La imagen es demasiado grande. El tamaño máximo es ${(maxFileSize / 1024) / 1024} MB`,
        code: 'file-size-exceeded',
    },
    invalidImgType: {
        message: (types: string[]) => `El tipo de imagen no es válido. Puedes usar: ${types.join(', ')}`,
        code: 'file-type-invalid',
    },
    invalidImgFormat: {
        message: 'El formato de la imagen no es válido. ¿Podrías intentar con otra?',
        code: 'file-format-invalid',
    },
    invalidImgName: {
        message: 'El nombre de la imagen no es válido. ¿Podrías cambiarlo?',
        code: 'file-name-invalid',
    },
    invalidImgExtension: {
        message: (fileExtension: string, validExtensions: string[]) => `La extensión ${fileExtension} no es válida. Puedes usar: ${validExtensions.join(', ')}`,
        code: 'file-extension-invalid',
    },
    imageNotFound: {
        message: 'No pudimos encontrar esta imagen. ¿Quieres subir una nueva?',
        code: 'file-not-found',
    },
}

export const orderErrors = {
    userNotFound: {
        message: 'No pudimos encontrar tu cuenta. ¿Quieres crear una nueva?',
        code: 'order-user-not-found',
    },
    missingUserId: {
        message: 'Falta información del usuario. Por favor, inicia sesión de nuevo',
        code: 'order-user-id-missing',
    },
    invalidUserId: {
        message: 'La información del usuario no es válida. Por favor, inicia sesión de nuevo',
        code: 'order-user-id-invalid',
    },
    invalidOrderId: {
        message: 'El número de pedido no es válido',
        code: 'order-id-invalid',
    },
    invalidOrderStatus: {
        message: 'El estado del pedido no es válido',
        code: 'order-status-invalid',
    },
    missingItems: {
        message: 'Tu carrito está vacío. ¿Quieres agregar algunos productos?',
        code: 'order-items-missing',
    },
    invalidItems: {
        message: 'Hay un problema con los productos en tu carrito. ¿Podrías revisarlos?',
        code: 'order-items-invalid',
    },
    missingTotalPrice: {
        message: 'No pudimos calcular el total de tu pedido. ¿Quieres intentar de nuevo?',
        code: 'order-total-price-missing',
    },
    invalidTotalPrice: {
        message: 'El total de tu pedido parece incorrecto. ¿Podrías revisarlo?',
        code: 'order-total-price-invalid',
    },
    missingShippingAddress: {
        message: 'No olvides agregar una dirección de envío',
        code: 'order-shipping-address-missing',
    },
    invalidShippingAddress: {
        message: 'La dirección de envío no parece ser válida. ¿Podrías revisarla?',
        code: 'order-shipping-address-invalid',
    },
    missingPaymentMethod: {
        message: 'Por favor, selecciona un método de pago',
        code: 'order-payment-method-missing',
    },
    invalidPaymentMethod: {
        message: 'El método de pago seleccionado no es válido. ¿Quieres elegir otro?',
        code: 'order-payment-method-invalid',
    },
    invalidCouponCode: {
        message: 'El código de cupón no es válido. ¿Quieres intentar con otro?',
        code: 'order-coupon-code-invalid',
    },
    invalidOrderTotal: {
        message: 'El total de tu pedido no alcanza el mínimo requerido',
        code: 'order-total-invalid',
    },
    invalidTrackingUrl: {
        message: 'El enlace de seguimiento no es válido',
        code: 'order-tracking-url-invalid',
    },
    ordersNotFound: {
        message: 'No encontramos pedidos asociados a tu cuenta',
        code: 'orders-not-found',
    },
    orderNotFound: {
        message: 'No pudimos encontrar este pedido. ¿Quieres hacer uno nuevo?',
        code: 'order-not-found',
    },
    orderAlreadyExist: {
        message: 'Este pedido ya existe. ¿Quieres revisar tus pedidos actuales?',
        code: 'order-already-exist',
    },
    orderNotBelongToUser: {
        message: 'Este pedido no pertenece a tu cuenta',
        code: 'order-not-belong-to-user',
    },
    productNotFound: {
        message: (productId: string) => `No pudimos encontrar uno de los productos en tu carrito. ¿Quieres revisarlo?`,
        code: 'order-product-not-found',
    },
    insufficientStock: {
        message: 'Lo sentimos, no hay suficiente stock para completar tu pedido',
        code: 'order-insufficient-stock',
    },
    invalidPrice: {
        message: 'El precio de uno de los productos no es válido. ¿Podrías revisarlo?',
        code: 'order-product-price-invalid',
    },
}

export const couponErrors = {
    invalidCouponCode: {
        message: 'El código de cupón no es válido. ¿Quieres intentar con otro?',
        code: 'coupon-code-invalid',
    },
    invalidDiscountType: {
        message: (discountTypes: string[]) => `El tipo de descuento no es válido. Puedes usar: ${discountTypes.join(', ')}`,
        code: 'coupon-discount-type-invalid',
    },
    invalidDiscountAmount: {
        message: 'El descuento debe ser mayor a 0. ¿Podrías revisarlo?',
        code: 'coupon-discount-amount-invalid',
    },
    invalidMinimumPurchaseAmount: {
        message: 'El mínimo de compra debe ser mayor a 0. ¿Podrías revisarlo?',
        code: 'coupon-minimum-purchase-invalid',
    },
    invalidEndDate: {
        message: 'La fecha de finalización del cupón no es válida. ¿Podrías revisarla?',
        code: 'coupon-end-date-invalid',
    },
    invalidStatus: {
        message: (statusOptions: string[]) => `El estado del cupón no es válido. Puede ser: ${statusOptions.join(', ')}`,
        code: 'coupon-status-invalid',
    },
    missingDiscountType: {
        message: 'Por favor, selecciona el tipo de descuento',
        code: 'coupon-discount-type-missing',
    },
    missingDiscountAmount: {
        message: 'Por favor, ingresa la cantidad de descuento',
        code: 'coupon-discount-amount-missing',
    },
    missingMinimumPurchaseAmount: {
        message: 'Por favor, ingresa el mínimo de compra',
        code: 'coupon-minimum-purchase-missing',
    },
    missingEndDate: {
        message: 'Por favor, ingresa la fecha de finalización del cupón',
        code: 'coupon-end-date-missing',
    },
    missingStatus: {
        message: 'Por favor, selecciona el estado del cupón',
        code: 'coupon-status-missing',
    },
    missingCouponCode: {
        message: 'Por favor, ingresa el código del cupón',
        code: 'coupon-code-missing',
    },
    missingProductIds: {
        message: 'Por favor, selecciona al menos un producto para el cupón',
        code: 'coupon-product-ids-missing',
    },
    missingPurchaseAmount: {
        message: 'Por favor, ingresa el monto de la compra',
        code: 'coupon-purchase-amount-missing',
    },
    invalidPurchaseAmount: {
        message: 'El monto de la compra debe ser mayor a 0. ¿Podrías revisarlo?',
        code: 'coupon-purchase-amount-invalid',
    },
    productNotFound: {
        message: (productId: string) => `No pudimos encontrar uno de los productos. ¿Quieres revisarlo?`,
        code: 'coupon-product-not-found',
    },
    couponNotFound: {
        message: 'No pudimos encontrar este cupón. ¿Quieres crear uno nuevo?',
        code: 'coupon-not-found',
    },
    couponAlreadyExist: {
        message: 'Este cupón ya existe. ¿Quieres crear uno diferente?',
        code: 'coupon-already-exist',
    },
    invalidCategoryId: {
        message: 'La categoría seleccionada no es válida',
        code: 'coupon-category-invalid',
    },
    invalidProductId: {
        message: 'Uno o más productos seleccionados no son válidos',
        code: 'coupon-product-ids-invalid',
    },
    invalidSubcategoryId: {
        message: 'La subcategoría seleccionada no es válida',
        code: 'coupon-subcategory-invalid',
    },
    expiredCoupon: {
        message: 'Lo sentimos, este cupón ha expirado',
        code: 'coupon-expired',
    },
    inactiveCoupon: {
        message: 'Este cupón no está activo actualmente',
        code: 'coupon-inactive',
    },
    minimumPurchaseAmountNotReached: {
        message: 'Tu compra no alcanza el mínimo requerido para usar este cupón',
        code: 'coupon-minimum-purchase-not-reached',
    },
    productsNotFound: {
        message: 'No pudimos encontrar algunos de los productos seleccionados',
        code: 'coupon-products-not-found',
    },
    expiredEndDate: {
        message: 'La fecha de finalización del cupón ya pasó. ¿Quieres actualizarla?',
        code: 'coupon-end-date-expired',
    },
    couponNotApplicable: {
        message: 'Este cupón no se aplica a los productos en tu carrito',
        code: 'coupon-not-applicable',
    },
}


export const interfacesValidatorsErrors = {
    productVariant: {
        notArray: {
            message: 'La lista de productos no es válida. ¿Podrías revisarla?',
            code: 'product-variant-not-array',
        },
        noVariants: {
            message: 'No se han agregado variantes al producto. ¿Quieres agregar alguna?',
            code: 'product-variant-missing',
        },
        invalidPrice: {
            message: 'El precio de la variante debe ser mayor a 0. ¿Podrías revisarlo?',
            code: 'product-variant-price-invalid',
        },
        invalidStock: {
            message: 'El stock de la variante debe ser mayor a 0. ¿Podrías revisarlo?',
            code: 'product-variant-stock-invalid',
        },
        invalidSize: {
            message: 'El tamaño de la variante no es válido. ¿Podrías revisarlo?',
            code: 'product-variant-size-invalid',
        },
        invalidColor: {
            message: 'El color de la variante no es válido. ¿Podrías revisarlo?',
            code: 'product-variant-color-invalid',
        }
    },
    orderItem: {
        noItems: {
            message: 'Tu carrito está vacío. ¿Quieres agregar algunos productos?',
            code: 'order-item-missing',
        },
        invalidProductId: {
            message: 'Uno de los productos en tu carrito no es válido. ¿Podrías revisarlo?',
            code: 'order-item-product-id-invalid',
        },
        invalidQuantity: {
            message: 'La cantidad de un producto debe ser mayor a 0. ¿Podrías revisarla?',
            code: 'order-item-quantity-invalid',
        },
        invalidQuantityValue: {
            message: 'La cantidad de un producto debe ser mayor a 0. ¿Podrías revisarla?',
            code: 'order-item-quantity-value-invalid',
        },
        invalidVariant: {
            message: 'Una de las variantes seleccionadas no es válida. ¿Podrías revisarla?',
            code: 'order-item-variant-invalid',
        }
    },
    shippingAddress: {
        noAdress: {
            message: 'Por favor, agrega una dirección de envío',
            code: 'shipping-address-missing',
        },
        invalidPhone: {
            message: 'El número de teléfono no es válido. ¿Podrías revisarlo?',
            code: 'shipping-address-phone-invalid',
        },
        invalidStreet: {
            message: 'La calle no es válida. ¿Podrías revisarla?',
            code: 'shipping-address-street-invalid',
        },
        invalidCity: {
            message: 'La ciudad no es válida. ¿Podrías revisarla?',
            code: 'shipping-address-city-invalid',
        },
        invalidState: {
            message: 'El estado no es válido. ¿Podrías revisarlo?',
            code: 'shipping-address-state-invalid',
        },
        invalidPostalCode: {
            message: 'El código postal no es válido. ¿Podrías revisarlo?',
            code: 'shipping-address-postal-code-invalid',
        },
        invalidCountry: {
            message: 'El país no es válido. ¿Podrías revisarlo?',
            code: 'shipping-address-country-invalid',
        },
    },
    orderTotal: {
        noOrderTotal: {
            message: 'No pudimos calcular el total de tu pedido. ¿Quieres intentar de nuevo?',
            code: 'order-total-missing',
        },
        invalidSubtotal: {
            message: 'El subtotal de tu pedido no es válido. ¿Podrías revisarlo?',
            code: 'order-total-subtotal-invalid',
        },
        invalidDiscount: {
            message: 'El descuento aplicado no es válido. ¿Podrías revisarlo?',
            code: 'order-total-discount-invalid',
        },
        invalidTotal: {
            message: 'El total de tu pedido no es válido. ¿Podrías revisarlo?',
            code: 'order-total-invalid',
        },
        invalidSubtotalValue: {
            message: 'El subtotal de tu pedido debe ser mayor a 0. ¿Podrías revisarlo?',
            code: 'order-total-subtotal-value-invalid',
        },
        invalidDiscountValue: {
            message: 'El descuento aplicado debe ser mayor a 0. ¿Podrías revisarlo?',
            code: 'order-total-discount-value-invalid',
        },
        invalidTotalValue: {
            message: 'El total de tu pedido debe ser mayor a 0. ¿Podrías revisarlo?',
            code: 'order-total-value-invalid',
        }
    },
    url: {
        invalidUrl: {
            message: 'La URL no es válida. ¿Podrías revisarla?',
            code: 'url-invalid',
        }
    }
}

export const sharedErrors = {
    unauthorized: {
        message: 'No tienes permiso para realizar esta acción. ¿Quieres iniciar sesión?',
        code: 'shared-unauthorized',
    },
    missingFields: {
        message: 'Faltan algunos datos. ¿Podrías completar todos los campos?',
        code: 'shared-fields-missing',
    },
    invalidBearer: {
        message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo',
        code: 'shared-bearer-invalid',
    },
    noFieldToUpdate: {
        message: 'No se ha seleccionado ningún campo para actualizar',
        code: 'shared-update-fields-missing',
    },
    missingId: {
        message: 'Falta un identificador necesario',
        code: 'shared-id-missing',
    },
    unknownError: {
        message: 'Ups, algo salió mal. Por favor, inténtalo de nuevo más tarde',
        code: 'shared-unknown-error',
    },
    invalidId: {
        message: 'El identificador proporcionado no es válido',
        code: 'shared-id-invalid',
    },
    invalidParameters: {
        message: 'Algunos de los datos ingresados no son válidos. ¿Podrías revisarlos?',
        code: 'shared-parameters-invalid',
    },
    invalidPage: {
        message: 'El número de página no es válido. ¿Podrías revisarlo?',
        code: 'shared-page-invalid',
    },
    invalidLimit: {
        message: 'El límite de resultados no es válido. ¿Podrías revisarlo?',
        code: 'shared-limit-invalid',
    },
    invalidImg: {
        message: 'La imagen no es válida. ¿Podrías intentar con otra?',
        code: 'shared-img-invalid',
    },
}