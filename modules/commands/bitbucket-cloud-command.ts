import { AxiosCli } from '../clients/axios-cli';

const bitbucketCloudCommand = new AxiosCli({
    name: 'Bitbucket Cloud API',
    baseURL: 'https://api.bitbucket.org/2.0',
    auth: {
        bearerToken: async () => undefined
    },
    headers: {}
});

const program = bitbucketCloudCommand.program();
program.version('1.0.0');
program.parse(process.argv);
