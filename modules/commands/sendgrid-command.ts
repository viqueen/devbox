import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const sendgridCommand = new AxiosCli({
    name: 'SendGrid API',
    baseURL: 'https://api.sendgrid.com',
    auth: {
        bearerToken: async () => envConfig.SENDGRID_TOKEN
    },
    headers: {}
});

const program = sendgridCommand.program();
program.version('1.0.0');
program.parse(process.argv);
