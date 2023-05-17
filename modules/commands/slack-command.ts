import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const slackCommand = new AxiosCli({
    name: 'Slack API',
    baseURL: 'https://slack.com/api',
    auth: {
        bearerToken: async () => envConfig.SLACK_TOKEN
    },
    headers: {}
});

const program = slackCommand.program();
program.version('1.0.0');
program.parse(process.argv);
