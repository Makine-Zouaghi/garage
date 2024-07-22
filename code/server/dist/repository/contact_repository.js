import MongoDBService from "../service/mongodb_service.js";
class ContactRepository {
    // collection principale utilisée par la classe 
    collection = "contact";
    // sélection de tous les documents
    findAll = async () => {
        // connexion au serveur mongodb
        const connection = await new MongoDBService().connect();
        await connection.connect();
        // selection de la collection
        const collection = connection.db().collection(this.collection);
        // requête
        const results = collection.find().toArray();
        // retourner les resultats
        return results;
    };
    create = async (data) => {
        // connexion au serveur mongodb
        const connection = await new MongoDBService().connect();
        await connection.connect();
        // selection de la collection
        const collection = connection.db().collection(this.collection);
        // requête
        const results = collection.insertOne(data);
        // retourner les resultats
        return results;
    };
}
export default ContactRepository;
