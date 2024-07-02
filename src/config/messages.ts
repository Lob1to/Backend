
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
        message: 'Ups, algo malo ha pasado',
        code: 'unknown-error',
    },

    tokenGenerationError: {
        message: 'Ha ocurrido un error obteniendo el token',
        code: 'server-error',
    },

    sendEmailError: {
        message: 'Ha ocurrido un error mientras se enviaba el correo',
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
        message: 'El correo ingresado no es correcto',
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
    }


}

