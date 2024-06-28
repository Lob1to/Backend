import mongoose from 'mongoose';

interface ConnectionOptions {
    dbName: string,
    mongoUrl: string,
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions) {

        const { dbName, mongoUrl } = options;

        try {

            mongoose.connect(mongoUrl, {
                dbName: dbName
            });

            console.log('Connected to Mongo Database!')

        } catch (error) {

            console.log('An error happened while connecting to Mongo Database...');
            throw error;

        }

    }

}