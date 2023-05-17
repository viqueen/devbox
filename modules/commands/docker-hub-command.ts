import { AxiosCli } from '../lib/axios-cli';

const dockerHubCommand = new AxiosCli({
    baseURL: 'https://hub.docker.com/v2/repositories',
    name: 'Docker Hub API',
    auth: { bearerToken: async () => undefined },
    headers: {}
});
const program = dockerHubCommand.program();
program.version('1.0.0');
program.parse(process.argv);
