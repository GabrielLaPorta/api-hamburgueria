import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from './src/config/config';

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: config.postgreSql.host,
    port: Number(config.postgreSql.port),
    username: config.postgreSql.user,
    password: config.postgreSql.pass,
    database: config.postgreSql.database,
    synchronize: true,
    logging: process.env['TYPEORM_LOGGING'] == 'true',
    migrationsRun: process.env['MIGRATIONS_RUN'] == 'true',
    cli: {
        migrationsDir: './migration',
        entitiesDir: './entity'
    },
    entities: ['./entity/**/**{.ts,.js}', './bin/entity/**/**{.ts,.js}'],
    migrations: ['./migration/*{.ts, .js}'],
    namingStrategy: new SnakeNamingStrategy()
};

export = ormConfig;
