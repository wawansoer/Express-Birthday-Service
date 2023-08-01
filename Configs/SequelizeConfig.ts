import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
/** 
* This code snippet creates a Sequelize instance for connecting to a PostgreSQL database.
* It uses environment variables for configuration and allows for logging of database queries.
* The code sets up a connection pool, sets the timezone to UTC + 0, and enables date string parsing and type casting 
*/
dotenv.config();
let db_log = false
if (process.env.DB_LOG === "True") {
    db_log = true
}
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: db_log,
        pool: {
            max: 3,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            useUTC: true,
            dateStrings: true,
            typeCast: true,
        },
        timezone: "+00:00",
    }
);


export default sequelize;