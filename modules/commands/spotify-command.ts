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
import * as queryString from 'querystring';

import axios from 'axios';

import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const spotifyCommand = new AxiosCli({
    name: 'Spotify API',
    baseURL: 'https://api.spotify.com/v1',
    auth: {
        bearerToken: async () => {
            const clientId = envConfig.SPOTIFY_CLIENT_ID;
            const clientSecret = envConfig.SPOTIFY_CLIENT_SECRET;
            const client = axios.create({
                baseURL: 'https://accounts.spotify.com',
                auth: {
                    username: clientId,
                    password: clientSecret
                }
            });
            const response = await client.request({
                url: '/api/token',
                method: 'post',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: queryString.stringify({
                    grant_type: 'client_credentials'
                })
            });
            return response.data.access_token;
        }
    },
    headers: {}
});
const program = spotifyCommand.program();
program.version('1.0.0');
program.parse(process.argv);
