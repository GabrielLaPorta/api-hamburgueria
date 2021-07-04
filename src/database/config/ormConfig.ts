import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '../../config/config';

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: config.postgreSql.host,
    port: Number(config.postgreSql.port),
    username: config.postgreSql.user,
    password: config.postgreSql.pass,
    database: config.postgreSql.database,
    synchronize: false,
    logging: process.env['TYPEORM_LOGGING'] == 'true',
    migrationsRun: process.env['MIGRATIONS_RUN'] == 'true',
    cli: {
        migrationsDir: 'src/db/migration',
        entitiesDir: 'src/entity'
    },
    entities: ['src/typeorm/entities/**/*.ts'],
    migrations: ['src/typeorm/migrations/**/*.ts'],
    namingStrategy: new SnakeNamingStrategy()
};

export = ormConfig;
