import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

/**
 * Adapter class, it provides methods for hashing and comparing passwords
 */
export class BcryptAdapter {
    /**
     * Generates a hash of the provided password.
     * @param password Plain text password to hash.
     * @returns Generated hash of the provided password.
     */
    static hash = (password: string) => {
        const salt = genSaltSync();
        return hashSync(password, salt)
    }

    /**
     * Compares a plain text password with a hashed password
     * @param password Plain text password.
     * @param hashed Hash to be compared with the password.
     * @returns true if the password matches with the hash, otherwise it returns false.
     */

    static compare = (password: string, hashed: string) => {
        return compareSync(password, hashed);
    }

}