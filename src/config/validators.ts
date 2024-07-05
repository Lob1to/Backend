export const validators = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: {
        minLength: 6,
        maxLength: 16,
        RegExp: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{6,16}$/
    },

    description: {
        maxLength: 100,
    },
}


export const interfacesValidators = {

    isProductVariant: (variants: { [key: string]: any }[]): boolean => {
        if (!Array.isArray(variants)) return false;
        if (+variants.length === 0) return false;

        const {
            price,
            stock,
            size,
            color
        } = variants[0];

        if (!price || typeof price !== 'number') return false;
        if (!stock || typeof stock !== 'number') return false;
        if (size && typeof size !== 'string') return false;
        if (color && typeof color !== 'string') return false;

        return true;
    }

}

