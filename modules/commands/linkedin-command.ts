import { AxiosCli } from '../lib/axios-cli';

const linkedinCommand = new AxiosCli({
    name: 'LinkedIn API',
    baseURL: 'https://api.linkedin.com',
    auth: {
        bearerToken: async () => undefined
    },
    headers: {}
});

const program = linkedinCommand.program();
program.version('1.0.0');
program.parse(process.argv);
