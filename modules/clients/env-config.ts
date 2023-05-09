import dotenv from 'dotenv';
import path from 'path';

interface EnvConfig {
    NOTION_TOKEN: string;
    SENDGRID_TOKEN: string;
    SLACK_TOKEN: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
}

const parsedConfig: unknown =
    dotenv.config({
        path: path.resolve(process.env.VIQUEEN_DEVBOX_HOME ?? '', '.env')
    }).parsed || {};
const envConfig = parsedConfig as EnvConfig;

export { envConfig };
