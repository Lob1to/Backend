
export const validators = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: {
        minLength: 6,
        maxLength: 16,
        RegExp: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{6,16}$/
    }
}

