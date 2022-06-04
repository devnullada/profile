import Express from 'express';
import chalk from 'chalk';
import {json, urlencoded} from 'body-parser';
import cors from 'cors';
import {getEnvironmentVariable, isNodeDevelopment} from '../Shared/Utils';
import {
    APP_NAME,
    MAX_JSON_PAYLOAD_SIZE,
} from '../../shared/src/Types/Constants';
import os from 'os';
import * as http from 'http';
import {setRoutes} from './Controllers';

const app = Express();
const server = http.createServer(app);

export function startExpress(): Promise<void> {
    return new Promise((resolve) => {
        // JSON handler
        app.use(json({limit: MAX_JSON_PAYLOAD_SIZE}));

        // URL encoder/decoder
        app.use(urlencoded({extended: false}));

        // Trust developer proxies
        if (!isNodeDevelopment()) {
            app.set('trust proxy', 1);
        }

        // Cors
        app.use(
            cors({
                origin: (origin: any, callback: any) => callback(null, true),
                optionsSuccessStatus: 200,
                credentials: true,
                methods: ['POST', 'GET'],
            })
        );

        // Static route
        app.use('/Static', Express.static('Static'));

        // Controllers
        setRoutes(app);

        const appListener = (): void => {
            if (isNodeDevelopment()) {
                console.log(`DEVELOPMENT mode on host ${os.hostname()}.`);
            } else {
                console.log(`PRODUCTION mode on host ${os.hostname()}.`);
            }
            console.log(
                `${APP_NAME} listening on port ${chalk.blueBright(
                    getEnvironmentVariable("PROFILE_WEBSERVER_PORT")
                )}.`
            );
            resolve();
        };

        server.listen(
            getEnvironmentVariable("PROFILE_WEBSERVER_PORT"),
            appListener
        );
    });
}
