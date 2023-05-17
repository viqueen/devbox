import { AxiosCli } from '../lib/axios-cli';

const githubCommand = new AxiosCli({
    baseURL: 'https://api.github.com',
    name: 'GitHub API',
    auth: { bearerToken: async () => undefined },
    headers: {}
});

const program = githubCommand.program();
program.version('1.0.0');
program.parse(process.argv);
