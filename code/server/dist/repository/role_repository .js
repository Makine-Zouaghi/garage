import MysqlService from "../service/mysql_service.js";
class RoleRepository {
    // accéder au service MySQL
    mySQLService = new MysqlService();
    // table principale itilisée par la classe
    table = "roles";
    // selection de tous les enregistrements
    selectAll = async () => {
        const connection = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
        // exécuter la requête SQL ou récupérer une erreur
        try {
            const results = await connection.execute(query);
            // renvoyer les résultats de la requête
            return results.shift();
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
            return results.shift().shift();
        }
        catch (error) {
            return error;
        }
    };
}
export default RoleRepository;
