import mysql, { Pool } from 'mysql2/promise';

class MysqlService{
    public connect = async (): Promise<Pool> => {
        const connection = mysql.createPool({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            // permet de créer des requetes préparées
            namedPlaceholders: true,
        });

        return connection;
    };
}

export default MysqlService;