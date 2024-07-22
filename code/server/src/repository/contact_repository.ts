import type { Collection, Document, MongoClient } from "mongodb";
import MongoDBService from "../service/mongodb_service.js";

class ContactRepository {
    // collection principale utilisée par la classe 
    private collection = "contact";

	// sélection de tous les documents
	public findAll = async (): Promise<unknown> => {
        // connexion au serveur mongodb
        const connection: MongoClient = await new MongoDBService().connect();
        await connection.connect();

        // selection de la collection
        const collection: Collection = connection.db().collection(this.collection);

        // requête
        const results = collection.find().toArray();

        // retourner les resultats
        return results;
    };

    public create = async (data: object): Promise<unknown> => {
        // connexion au serveur mongodb
        const connection: MongoClient = await new MongoDBService().connect();
        await connection.connect();

        // selection de la collection
        const collection: Collection = connection.db().collection(this.collection);

        // requête
        const results = collection.insertOne(data);

        // retourner les resultats
        return results;
    };
}

export default ContactRepository;
