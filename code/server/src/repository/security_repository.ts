import type { Pool } from "mysql2/promise";
import MysqlService from "../service/mysql_service.js";
import type User from "../models/user.js";
import RoleRepository from "./role_repository .js";

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

	public getUserByEmail = async (data: User) => {
		// connexion
		const connection: Pool = await this.mySQLService.connect();

		// première requète
		const query = `
                SELECT ${this.table}.*
                FROM ${process.env.MYSQL_DB}.${this.table}
                WHERE ${this.table}.email = :email    
                ;
            `;

		try {
			// executer la requete
			const results = await connection.execute(query, data);

			const fullResult: User | undefined = (results.shift() as User[]).shift();

			// recuperer un objet role
			const role = await new RoleRepository().selectOne({
				id: (fullResult as User).roles_id,
			});

			console.log(role);

			(fullResult as User).role = role;

			return fullResult;
		} catch (error) {
			return error;
		}
	};
}

export default SecurityRepository;
