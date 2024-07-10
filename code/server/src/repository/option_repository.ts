import { FieldPacket, Pool, QueryResult } from "mysql2/promise";
import MysqlService from "../service/mysql_service.js";
import Option from "../models/option.js";

class OptionRepository {
    // accéder au service MySQL
    private mySQLService = new MysqlService();

    // table principale itilisée par la classe
    private table = 'options';

    // selection de tous les enregistrements
    public selectAll = async (): Promise<QueryResult | unknown | Option[]> => {
        /* connexion à la basse de données
            await permet de créer un temps d'attente
                obligatoirement utilisé dans une fonction asynchrone
                permet de récupérer automatiquement le contenu de la promesse 
        */
        const connection: Pool = await this.mySQLService.connect();


        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;

        // exécuter la requête SQL ou récupérer une erreur
        try {
            const results: [QueryResult, FieldPacket[]] = await
                connection.execute(query);

            // renvoyer les résultats de la requête
            return results.shift();
            } catch (error) {
            return error;
        }

    };


    //data represente le req.params envoyé par le controller
    public selectOne = async (data: object): Promise<QueryResult | unknown | Option > => {
        const connection: Pool = await this.mySQLService.connect();

        //creation d'une variable de requete, eviter les injection sql
        const query = `SELECT ${this.table}.* 
                        FROM ${process.env.MYSQL_DB}.${this.table}
                        WHERE ${this.table}.id = :id
                        ;
                    `;

        try {
            const results: [QueryResult, FieldPacket[]] = await
                connection.execute(query, data);

            

            return (results.shift() as []).shift();
            } catch (error) {
            return error;
        }

    };


    // permet de selectioner dans une liste
    public selectInList = async (data: string): Promise<QueryResult | unknown | Option[] > => {
        const connection: Pool = await this.mySQLService.connect();

        //creation d'une variable de requete, eviter les injection sql
        const query = `SELECT ${this.table}.* 
                        FROM ${process.env.MYSQL_DB}.${this.table}
                        WHERE ${this.table}.id IN (${data})
                        ;
                    `;

        try {
            const results: [QueryResult, FieldPacket[]] = await
                connection.execute(query, data);

            

            return (results.shift() as []).shift();
            } catch (error) {
            return error;
        }

    };
}


export default OptionRepository;