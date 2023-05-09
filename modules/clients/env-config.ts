import dotenv from 'dotenv';

interface EnvConfig {
    SENDGRID_TOKEN: string;
    SLACK_TOKEN: string;
}

const parsedConfig: unknown = dotenv.config().parsed || {};
const envConfig = parsedConfig as EnvConfig;

export { envConfig };
