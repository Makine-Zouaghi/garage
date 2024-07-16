import {
	type FieldPacket,
	type Pool,
	PoolConnection,
	type QueryResult,
} from "mysql2/promise";
import MysqlService from "../service/mysql_service.js";
import type User from "../models/user.js";

class SecurityRepository {
	// accéder au service MySQL
	private mySQLService = new MysqlService();

	// table principale itilisée par la classe
	private table = "user";

	// selection de tous les enregistrements
	public register = async (data: User) => {
		// connexion
		const connection: Pool = await this.mySQLService.connect();

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
		} catch (error) {
			// annuler la transaction
			transaction.rollback();

			return error;
		}
	};
}

export default SecurityRepository;
