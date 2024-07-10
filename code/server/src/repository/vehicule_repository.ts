import { FieldPacket, Pool, QueryResult } from "mysql2/promise";
import MysqlService from "../service/mysql_service.js";
import Vehicule from "../models/vehicule.js";
import BrandRepository from "./brand_repository.js";
import Brand from "../models/brand.js";
import OptionRepository from "./option_repository.js";
import Option from "../models/option.js";

class VehiculeRepository {
    // accéder au service MySQL
    private mySQLService = new MysqlService();

    // table principale itilisée par la classe
    private table = 'vehicule';

    // selection de tous les enregistrements
    public selectAll = async (): Promise<QueryResult | unknown | Vehicule[]> => {
        /* connexion à la basse de données
            await permet de créer un temps d'attente
                obligatoirement utilisé dans une fonction asynchrone
                permet de récupérer automatiquement le contenu de la promesse 
        */
        const connection: Pool = await this.mySQLService.connect();


        const query =
            `SELECT ${this.table}.*, GROUP_CONCAT(options.id) AS options_id
            FROM ${process.env.MYSQL_DB}.${this.table} 
            JOIN ${process.env.MYSQL_DB}.vehicule_options ON vehicule_options.vehicule_id = vehicule.id
            JOIN ${process.env.MYSQL_DB}.options ON vehicule_options.options_id = options.id
            GROUP BY ${this.table}.id
            ;`;

        // exécuter la requête SQL ou récupérer une erreur
        try {
            const results: [QueryResult, FieldPacket[]] = await connection.execute(query);
            
            const fullResults = results.shift() as Vehicule[];
            
            //boucler sur les resultats
            for (let i = 0; i < fullResults.length; i++) {  
                // recuperer un objet Brand
                const brand: Brand | unknown = await new BrandRepository().selectOne({
                    id: fullResults[i].brand_id,
                });

                // assigner le resultat de la requete a une proprieté
                fullResults[i].brand = brand;
                
                // requete pour recuperer les,options
                const options: Option[] | unknown = await new OptionRepository().selectInList(
                    fullResults[i].options_id as string, 
                );

                // assigner les resultats de ka reqete a une propriété
                fullResults[i].options_id
                
                
            }

            // renvoyer les résultats de la requête
            return fullResults;
            // return results.shift();
            } catch (error) {
            return error;
        }

    };


    //data represente le req.params envoyé par le controller
    public selectOne = async (data: object): Promise<QueryResult | unknown | Vehicule> => {
        const connection: Pool = await this.mySQLService.connect();

        //creation d'une variable de requete, eviter les injection sql
        const query = `SELECT ${this.table}.* 
                        FROM ${process.env.MYSQL_DB}.${this.table}
                        WHERE ${this.table}.id = :id
                        ;
                    `;

        try {
            const results = await connection.execute(query, data);
            
            const fullResults : Vehicule = (results.shift() as Vehicule[]).shift() as Vehicule;

            const brand: Brand | unknown = await new BrandRepository().selectOne({
                id: fullResults.brand_id,
            });

            fullResults.brand = brand;

                return fullResults;
            } catch (error) {
                return error;
        }
    };
}

export default VehiculeRepository;