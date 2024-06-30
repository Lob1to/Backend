
export const validators = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: {
        minLength: 6,
        maxLength: 16,
        RegExp: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{6,16}$/
    }
}

