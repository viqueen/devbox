import { AxiosCli } from '../clients/axios-cli';
import { envConfig } from '../clients/env-config';
import axios from 'axios';
import * as queryString from 'querystring';

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
    }
});
const program = spotifyCommand.program();
program.version('1.0.0');
program.parse(process.argv);
