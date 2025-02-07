import jwt from 'jsonwebtoken';
import { envs } from './envs.plugin';

const JWT_SEED = envs.JWT_SEED;

/**
 * Adapter class for package jsonwebtoken, it provides methods to generate and validate Json Web Tokens.
 */
export class JwtAdapter {


    /**
     * Generates a JSON Web Token (JWT) with the provided payload and an optional duration.
     *
     * @param payload - The data to be encoded in the JWT.
     * @param duration - The expiration duration of the JWT, defaults to '1h' (1 hour).
     * @returns A Promise that resolves to the generated JWT token, or null if an error occurs.
     */
    static async generateToken(payload: any, duration: string = '1h',) {

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {

                if (err) return resolve(null);

                resolve(token);

            });
        });
    }


    /**
     * Verifies a JSON Web Token (JWT) and returns the decoded payload.
     *
     * @param token - The JWT token to be verified.
     * @returns A Promise that resolves to the decoded payload of the JWT, or null if the token is invalid.
     */
    static async validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {

            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T);
            });

        });

    }



}