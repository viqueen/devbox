import { AxiosCli } from '../clients/axios-cli';
import { envConfig } from '../clients/env-config';

const slackCommand = new AxiosCli({
    name: 'Slack API',
    baseURL: 'https://slack.com/api',
    auth: {
        bearerToken: async () => envConfig.SLACK_TOKEN
    }
});

const program = slackCommand.program();
program.version('1.0.0');
program.parse(process.argv);
