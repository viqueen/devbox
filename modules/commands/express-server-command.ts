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
import express from 'express';
import minimist from 'minimist';

import { expressMorganLogging } from '../lib/express-morgan-logging';
import { withCors } from '../lib/with-cors';

const argv = minimist(process.argv.slice(2));

const port = argv.port || 24642;

const app = express();
expressMorganLogging(app);
withCors({
    app,
    product: {
        baseUrls: ['http://localhost:24642', 'http://localhost:24643', 'null']
    }
});
let counter = 0;

app.get('/', (request, response) => {
    const current = counter++;
    response.redirect(`http://localhost:24643/pong/${current}`);
});

app.get('/pong/:value', (request, response) => {
    const { value } = request.params;
    response.redirect('http://localhost:24642/');
});

app.listen(port, () => {
    console.log(`⚡️ express server started at http://localhost:${port}`);
});
