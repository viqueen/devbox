import { AxiosCli } from '../lib/axios-cli';
import { envConfig } from '../lib/env-config';

const bitbucketCloudCommand = new AxiosCli({
    name: 'Bitbucket Cloud API',
    baseURL: 'https://api.bitbucket.org/2.0',
    auth: {
        bearerToken: async () => envConfig.BITBUCKET_CLOUD_TOKEN
    },
    headers: {}
});

const program = bitbucketCloudCommand.program();
program.version('1.0.0');
program.parse(process.argv);
