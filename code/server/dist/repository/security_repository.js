import MysqlService from "../service/mysql_service.js";
class SecurityRepository {
    // accéder au service MySQL
    mySQLService = new MysqlService();
    // table principale itilisée par la classe
    table = "user";
    // selection de tous les enregistrements
    register = async (data) => {
        // connexion
        const connection = await this.mySQLService.connect();
        // canal isolé pour la transaction
        const transaction = await connection.getConnection();
        try {
            // demarrer une transaction
            await transaction.beginTransaction();
            // première requète
            const query = `
                INSERT INTO ${process.env.MYSQL_DB}.${this.table}
                VALUE
                    (NULL, :email, :password, 2)
                ;
            `;
            const results = await connection.execute(query, data);
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
export default SecurityRepository;
