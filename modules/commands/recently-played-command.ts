import { AxiosOauthClient } from '../lib/axios-oauth-client';
import { envConfig } from '../lib/env-config';
import axios from 'axios';
import * as queryString from 'querystring';

const oauthClient = new AxiosOauthClient({
    name: 'spotify',
    authorizeUrl: 'https://accounts.spotify.com/authorize',
    grantUrl: 'https://accounts.spotify.com/api/token',
    clientId: envConfig.SPOTIFY_CLIENT_ID,
    clientSecret: envConfig.SPOTIFY_CLIENT_SECRET,
    scopes: ['user-read-recently-played']
});

const recentlyPlayed = async () => {
    const accessToken = await oauthClient.accessToken();
    const client = axios.create({
        baseURL: 'https://api.spotify.com/v1',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const query = { limit: 50 };
    const { data } = await client.request({
        url: `/me/player/recently-played?${queryString.stringify(query)}`,
        method: 'GET'
    });

    return data.items.map((item: any) => {
        // noinspection JSUnresolvedVariable
        const jsDate = new Date(item.played_at);
        const date = jsDate.toLocaleDateString('AU');
        const time = jsDate.toLocaleTimeString('AU');
        return {
            trackName: item.track.name,
            artists: item.track.artists.map((a: any) => a.name),
            playedAt: { date, time }
        };
    });
};

recentlyPlayed().then(console.table).catch(console.error);