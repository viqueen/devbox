import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const notionDbCommand = new AxiosCli({
    name: 'Notion DB API',
    baseURL: `https://api.notion.com/v1/databases/${envConfig.NOTION_DATABASE_ID}`,
    auth: {
        bearerToken: async () => envConfig.NOTION_TOKEN
    },
    headers: {
        'Notion-Version': '2021-05-13'
    }
});

const program = notionDbCommand.program();
program.version('1.0.0');
program.parse(process.argv);
