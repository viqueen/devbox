/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as os from 'os';
import * as path from 'path';

import express, { Request, Response } from 'express';
import minimist from 'minimist';

import { expressMorganLogging } from '../lib/express-morgan-logging';

const argv = minimist(process.argv.slice(2));

const app = express();
const port = argv.port || 3000;

expressMorganLogging(app);
app.use(express.json());

const directory = path.resolve(os.homedir(), '.public');
app.use('/public', express.static(directory));

function register(code: number) {
    const statusHandler = (request: Request, response: Response) => {
        response.sendStatus(code);
    };
    app.get(`/${code}`, statusHandler);
    app.post(`/${code}`, statusHandler);

    const delayedStatusHandler = (request: Request, response: Response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ms = request.query.ms as any;
        const msDelay = isNaN(ms) ? 1000 : parseInt(ms);
        setTimeout(() => {
            response.sendStatus(code);
        }, msDelay);
    };
    app.get(`/${code}-delay`, delayedStatusHandler);
    app.post(`/${code}-delay`, delayedStatusHandler);
}

const SUCCESS = [200, 201, 202, 203, 204, 205, 206];
SUCCESS.forEach((code) => {
    register(code);
});

const CLIENT_ERROR = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
    415, 416, 417
];
CLIENT_ERROR.forEach((code) => {
    register(code);
});

const SERVER_ERROR = [500, 501, 502, 503, 504, 505, 506, 511];
SERVER_ERROR.forEach((code) => {
    register(code);
});

app.listen(port, () => {
    console.log(`mock server started at http://localhost:${port}`);
});
