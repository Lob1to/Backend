
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

    missingImg: {
        message: 'No se ha proporcionado ninguna imagen',
        code: 'missing-img',
    },

    invalidImgSize: {
        message: 'El tamaño de la imagen excede el límite permitido',
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

