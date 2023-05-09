import { AxiosCli } from '../clients/axios-cli';
import { envConfig } from '../clients/env-config';

const sendgridCommand = new AxiosCli({
    name: 'SendGrid API',
    baseURL: 'https://api.sendgrid.com',
    auth: {
        bearerToken: async () => envConfig.SENDGRID_TOKEN
    }
});

const program = sendgridCommand.program();
program.version('1.0.0');
program.parse(process.argv);
