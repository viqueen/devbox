import { AxiosCli } from '../clients/axios-cli';
import { envConfig } from '../clients/env-config';

const notionCommand = new AxiosCli({
    name: 'Notion API',
    baseURL: 'https://api.notion.com/v1',
    auth: {
        bearerToken: async () => envConfig.NOTION_TOKEN
    },
    headers: {
        'Notion-Version': '2021-05-13'
    }
});
const program = notionCommand.program();
program.version('1.0.0');
program.parse(process.argv);
