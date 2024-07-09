import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    //* MongoDB config
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),

    //* Mailer config
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    WEBSERVICE_URL: env.get('WEBSERVICE_URL').required().asString(),

    //* JWT config
    JWT_SEED: env.get('JWT_SEED').required().asString(),

    //* Firebase config
    FIREBASE_API_KEY: env.get('FIREBASE_API_KEY').required().asString(),
    FIREBASE_AUTH_DOMAIN: env.get('FIREBASE_AUTH_DOMAIN').required().asString(),
    FIREBASE_PROJECT_ID: env.get('FIREBASE_PROJECT_ID').required().asString(),
    FIREBASE_STORAGE_BUCKET: env.get('FIREBASE_STORAGE_BUCKET').required().asString(),
    FIREBASE_MESSAGING_SENDER_ID: env.get('FIREBASE_MESSAGING_SENDER_ID').required().asString(),
    FIREBASE_APP_ID: env.get('FIREBASE_APP_ID').required().asString(),
    FIREBASE_MEASUREMENT_ID: env.get('FIREBASE_MEASUREMENT_ID').required().asString(),

    //* Firebase auth credentials
    FIREBASE_AUTH_EMAIL: env.get('FIREBASE_AUTH_EMAIL').required().asEmailString(),
    FIREBASE_AUTH_KEY: env.get('FIREBASE_AUTH_KEY').required().asString(),
}




