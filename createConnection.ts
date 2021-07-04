import { Connection, createConnection } from 'typeorm';

import ormConfig from './ormconfig';

export const dbCreateConnection = async (): Promise<Connection | null> => {
    try {
        const conn = await createConnection(ormConfig);
        console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    } catch (err) {
        console.log(err);
    }
    return null;
};
