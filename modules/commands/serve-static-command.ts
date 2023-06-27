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
import serveStatic from 'serve-static';

import { expressMorganLogging } from '../lib/express-morgan-logging';

const argv = minimist(process.argv.slice(2));

const port = argv.port || 7000;

const app = express();
const cwd = process.cwd();
expressMorganLogging(app);

app.use('/static', serveStatic(cwd));
app.listen(port, () => {
    console.log(`⚡️ static server started at http://localhost:${port}/static`);
});
