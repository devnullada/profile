import {getEnvironmentVariable} from './Utils';
import chalk from 'chalk';
import pgPromise from 'pg-promise';
import {APP_NAME} from '../../shared/src/Types/Constants';
import {promises as fsPromises} from 'fs';
import {join} from 'path';

const pgp = pgPromise();
export let db: pgPromise.IDatabase<any>;
pgp.pg.types.setTypeParser(20, parseInt); // Support bigint

export function getConnectionOptions() {
    return {
        application_name: APP_NAME,
        keepAlive: true,
        port: Number(
            getEnvironmentVariable("PROFILE_POSTGRESQL_PORT")
        ),
        host: String(
            getEnvironmentVariable("PROFILE_POSTGRESQL_HOSTNAME")
        ),
        user: String(
            getEnvironmentVariable("PROFILE_POSTGRESQL_USER")
        ),
        password: String(
            getEnvironmentVariable("PROFILE_POSTGRESQL_PASSWORD")
        ),
        database: String(
            getEnvironmentVariable("PROFILE_POSTGRESQL_DATABASE")
        ),
    };
}

export async function initializeDatabaseConnection() {
    db = pgp(getConnectionOptions());
    await db.connect();
    console.log(
        `Connected to database ${chalk.blueBright(
            getEnvironmentVariable("PROFILE_POSTGRESQL_DATABASE")
        )} on port ${chalk.blueBright(
            getEnvironmentVariable("PROFILE_POSTGRESQL_PORT")
        )}.`
    );
}

export async function initDatabase() {
    const root = process.env.ROOT_PATH!;

    const databaseFiles = [
        'Types.sql',
        'GenericFunctions.sql',
        'Tables.sql',
        'Functions.sql',
        'Data.sql',
    ];

    // Initialize database
    for (const dbFile of databaseFiles) {
        const sql = (
            await fsPromises.readFile(join(root, 'DDL', dbFile))
        ).toString();
        console.log(`Applying ${dbFile}`);
        try {
            await db.any(sql);
        } catch (err) {
            console.log(`[${dbFile}] - ` + String(err));
            throw err;
        }
    }
}
