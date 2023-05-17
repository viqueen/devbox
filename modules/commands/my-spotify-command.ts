import { AxiosCli } from '../lib/axios-cli';
import { AxiosOauthClient } from '../lib/axios-oauth-client';
import { envConfig } from '../lib/env-config';

const oauthClient = new AxiosOauthClient({
    name: 'Spotify',
    authorizeUrl: 'https://accounts.spotify.com/authorize',
    grantUrl: 'https://accounts.spotify.com/api/token',
    clientId: envConfig.SPOTIFY_CLIENT_ID,
    clientSecret: envConfig.SPOTIFY_CLIENT_SECRET,
    scopes: ['user-read-recently-played']
});

const mySpotifyCommand = new AxiosCli({
    name: 'Spotify API / ME',
    baseURL: 'https://api.spotify.com/v1/me',
    auth: {
        bearerToken: async () => oauthClient.accessToken()
    },
    headers: {}
});

const program = mySpotifyCommand.program();
program
    .command('login')
    .description('oauth login flow')
    .action(async () => {
        await oauthClient.login();
        process.exit();
    });
program.version('1.0.0');
program.parse(process.argv);
