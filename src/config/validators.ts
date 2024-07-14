import { interfacesValidatorsErrors } from "./messages";

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

//! TODO: Refactorizacion del codigo de los datasources para que devuelvan los mismos valores siempre y que sea consistente con el resto.

// TODO: Refactorizacion del codigo de las ordenes para que solo tenga que hacer un populate y que se encargue de las validaciones.

const {
    notArray,
    noVariants,
    invalidPrice,
    invalidStock,
    invalidSize,
    invalidColor,

} = interfacesValidatorsErrors.productVariant;

const {

    noItems,
    invalidProductId,
    invalidQuantity,
    invalidQuantityValue,
    invalidVariant,

} = interfacesValidatorsErrors.orderItem;

const {

    noAdress,
    invalidPhone,
    invalidStreet,
    invalidCity,
    invalidState,
    invalidPostalCode,
    invalidCountry,

} = interfacesValidatorsErrors.shippingAddress;

const {

    noOrderTotal,
    invalidSubtotal,
    invalidDiscount,
    invalidTotal,
    invalidSubtotalValue,
    invalidDiscountValue,
    invalidTotalValue,

} = interfacesValidatorsErrors.orderTotal;

const {

    invalidUrl

} = interfacesValidatorsErrors.url;

export const interfacesValidators = {

    isProductVariant: (variants: { [key: string]: any }[]): [boolean, string?, string?] => {
        if (!Array.isArray(variants)) return [false, notArray.message, notArray.code];
        if (+variants.length === 0) return [false, noVariants.message, noVariants.code];

        const {
            price,
            stock,
            size,
            color
        } = variants[0];

        if (!price || typeof price !== 'number') return [false, invalidPrice.message, invalidPrice.code];
        if (!stock || typeof stock !== 'number') return [false, invalidStock.message, invalidStock.code];
        if (size && typeof size !== 'string') return [false, invalidSize.message, invalidSize.code];
        if (color && typeof color !== 'string') return [false, invalidColor.message, invalidColor.code];

        return [true];
    },

    isValidOrderItems: (orderItems: { [key: string]: any }): [boolean, string?, string?] => {

        if (!orderItems || +Object.keys(orderItems).length === 0) return [false, noItems.message, noItems.code];

        for (let i = 0; i < Object.keys(orderItems).length; i++) {
            const { productId, quantity, variant } = orderItems[i];

            if (!productId || typeof productId !== 'string') return [false, invalidProductId.message, invalidProductId.code];
            if (!quantity || typeof quantity !== 'number') return [false, invalidQuantity.message, invalidQuantity.code];
            if (quantity < 1) return [false, invalidQuantityValue.message, invalidQuantityValue.code];
            if (variant && typeof variant !== 'string') return [false, invalidVariant.message, invalidVariant.code];
        }

        return [true];

    },

    isValidShippingAddress: (shippingAddress: { [key: string]: any }): [boolean, string?, string?] => {

        if (!shippingAddress || +Object.keys(shippingAddress).length === 0) return [false, noAdress.message, noAdress.code];

        const { phone, street, city, state, postalCode, country } = shippingAddress;

        if (!phone || typeof phone !== 'string') return [false, invalidPhone.message, invalidPhone.code];
        if (!street || typeof street !== 'string') return [false, invalidStreet.message, invalidStreet.code];
        if (!city || typeof city !== 'string') return [false, invalidCity.message, invalidCity.code];
        if (!state || typeof state !== 'string') return [false, invalidState.message, invalidState.code];
        if (!postalCode || typeof postalCode !== 'number') return [false, invalidPostalCode.message, invalidPostalCode.code];
        if (!country || typeof country !== 'string') return [false, invalidCountry.message, invalidCountry.code];

        return [true];

    },

    isValidOrderTotal: (orderTotal: { [key: string]: any }): [boolean, string?, string?] => {
        if (!orderTotal || +Object.keys(orderTotal).length === 0) return [false, noOrderTotal.message, noOrderTotal.code];

        const { subtotal, discount, total } = orderTotal[0];

        if (!subtotal || typeof subtotal !== 'number') return [false, invalidSubtotal.message, invalidSubtotal.code];
        if (discount && typeof discount !== 'number') return [false, invalidDiscount.message, invalidDiscount.code];
        if (!total || typeof total !== 'number') return [false, invalidTotal.message, invalidTotal.code];
        if (subtotal < 0) return [false, invalidSubtotalValue.message, invalidSubtotalValue.code];
        if (discount < 0) return [false, invalidDiscountValue.message, invalidDiscountValue.code];
        if (total < 0) return [false, invalidTotalValue.message, invalidTotalValue.code];

        return [true];

    },

    isValidUrl: (url: string): [boolean, string?, string?] => {
        if (!url || typeof url !== 'string') return [false, invalidUrl.message, invalidUrl.code];
        if (!url.startsWith('http')) return [false, invalidUrl.message, invalidUrl.code];

        return [true];
    }



}

