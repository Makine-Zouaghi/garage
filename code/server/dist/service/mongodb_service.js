import { MongoClient } from "mongodb";
class MongoDBService {
    // connection au serveur MongoDB
    connect = async () => {
        // url de connexion
        const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DB}?authSource=admin`;
        // connexion au serveur MongoDB
        const client = new MongoClient(url);
        // selection de la basse de données
        client.db(process.env.MONGODB_DB);
        // retourner la connexion
        return client;
    };
}
export default MongoDBService;
