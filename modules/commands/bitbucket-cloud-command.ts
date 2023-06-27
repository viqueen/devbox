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
import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const bitbucketCloudCommand = new AxiosCli({
    name: 'Bitbucket Cloud API',
    baseURL: 'https://api.bitbucket.org/2.0',
    auth: {
        bearerToken: async () => envConfig.BITBUCKET_CLOUD_TOKEN
    },
    headers: {}
});

const program = bitbucketCloudCommand.program();
program.version('1.0.0');
program.parse(process.argv);
