import MysqlService from "../service/mysql_service.js";
import BrandRepository from "./brand_repository.js";
import OptionRepository from "./option_repository.js";
class VehiculeRepository {
    // accéder au service MySQL
    mySQLService = new MysqlService();
    // table principale itilisée par la classe
    table = "vehicule";
    // selection de tous les enregistrements
    selectAll = async () => {
        /* connexion à la basse de données
            await permet de créer un temps d'attente
                obligatoirement utilisé dans une fonction asynchrone
                permet de récupérer automatiquement le contenu de la promesse
        */
        const connection = await this.mySQLService.connect();
        // requete SQL
        const query = `SELECT ${this.table}.*, 
			GROUP_CONCAT(options.id) AS options_id
            FROM ${process.env.MYSQL_DB}.${this.table} 
			LEFT JOIN ${process.env.MYSQL_DB}.vehicule_options
			ON vehicule_options.vehicule_id = vehicule.id
			LEFT JOIN ${process.env.MYSQL_DB}.options
			ON vehicule_options.options_id = options.id
            GROUP BY ${this.table}.id
            ;`;
        // exécuter la requête SQL ou récupérer une erreur
        try {
            const results = await connection.execute(query);
            const fullResults = results.shift();
            //boucler sur les resultats
            for (let i = 0; i < fullResults.length; i++) {
                // recuperer un objet Brand
                const brand = await new BrandRepository().selectOne({
                    id: fullResults[i].brand_id,
                });
                // assigner le resultat de la requete a une proprieté
                fullResults[i].brand = brand;
                // requete pour recuperer les,options
                const options = await new OptionRepository().selectInList(fullResults[i].options_id);
                // assigner les resultats de ka reqete a une propriété
                fullResults[i].options = options;
            }
            // renvoyer les résultats de la requête
            return fullResults;
            // return results.shift();
        }
        catch (error) {
            return error;
        }
    };
    //data represente le req.params envoyé par le controller
    selectOne = async (data) => {
        const connection = await this.mySQLService.connect();
        //creation d'une variable de requete, eviter les injection sql
        const query = `SELECT ${this.table}.* 
                        FROM ${process.env.MYSQL_DB}.${this.table}
                        WHERE ${this.table}.id = :id
                        ;
                    `;
        try {
            const results = await connection.execute(query, data);
            const fullResults = results.shift().shift();
            const brand = await new BrandRepository().selectOne({
                id: fullResults.brand_id,
            });
            fullResults.brand = brand;
            return fullResults;
        }
        catch (error) {
            return error;
        }
    };
    create = async (data) => {
        // connexion
        const connection = await this.mySQLService.connect();
        // canal isolé pour la transaction
        const transaction = await connection.getConnection();
        try {
            // demarrer une transaction
            await transaction.beginTransaction();
            // première requète
            let query = `
                INSERT INTO ${process.env.MYSQL_DB}.${this.table}
                VALUE
                    (NULL, :model, :price, :brand_id)
                ;
            `;
            await connection.execute(query, data);
            // executer le derneier identifiant inséré
            query = "SET @vehicule_id = LAST_INSERT_ID();";
            await connection.execute(query);
            // inserer les options
            const values = data.options_id?.split(",").map((value) => `(@vehicule_id, ${value})`).join(",");
            query = `
				INSERT INTO ${process.env.MYSQL_DB}.vehicule_options
				Values ${values};
			`;
            const results = await connection.execute(query);
            //valider la transaction
            await transaction.commit();
        }
        catch (error) {
            // annuler la transaction
            transaction.rollback();
            return error;
        }
    };
}
export default VehiculeRepository;
