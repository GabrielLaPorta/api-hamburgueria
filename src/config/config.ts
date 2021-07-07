import dotenv from 'dotenv';

dotenv.config();

const POSTGRE_SQL_HOST = process.env.POSTGRE_SQL_HOST || 'localhost';
const POSTGRE_SQL_DATABASE = process.env.POSTGRE_SQL_DATABASE || 'hamburgueria';
const POSTGRE_SQL_PORT = process.env.POSTGRE_SQL_PORT || 5432;
const POSTGRE_SQL_USER = process.env.POSTGRE_SQL_USER || 'superuser';
const POSTGRE_SQL_PASS = process.env.POSTGRE_SQL_PASS || 'roseville';

const POSTGRE_SQL = {
    host: POSTGRE_SQL_HOST,
    database: POSTGRE_SQL_DATABASE,
    user: POSTGRE_SQL_USER,
    pass: POSTGRE_SQL_PASS,
    port: POSTGRE_SQL_PORT
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const JWT_KEY = process.env.JWT_KEY || 'segredo';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    jwtKey: JWT_KEY
};

const config = {
    postgreSql: POSTGRE_SQL,
    server: SERVER
};

export default config;
