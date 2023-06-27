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
import path from 'path';

import dotenv from 'dotenv';

interface EnvConfig {
    NOTION_TOKEN: string;
    NOTION_DATABASE_ID: string;
    SENDGRID_TOKEN: string;
    SLACK_TOKEN: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    BITBUCKET_CLOUD_TOKEN: string;
}

const parsedConfig: unknown =
    dotenv.config({
        path: path.resolve(process.env.VIQUEEN_DEVBOX_HOME ?? '', '.env')
    }).parsed || {};
const envConfig = parsedConfig as EnvConfig;

export { envConfig };
