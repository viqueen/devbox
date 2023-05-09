import { Command } from 'commander';
import axios, { AxiosInstance } from 'axios';

interface AxiosCliProps {
    name: string;
    baseURL: string;
}

class AxiosCli {
    private readonly client: AxiosInstance;
    constructor(private readonly props: AxiosCliProps) {
        this.client = axios.create({
            baseURL: this.props.baseURL
        });
    }

    public program() {
        const _program = new Command();
        ['get', 'post', 'delete', 'put', 'head', 'option'].forEach((method) => {
            _program
                .command(`${method} [parts...]`)
                .description(`${method} ${this.props.name} resources`)
                .action(async (parts) => {
                    this.client
                        .request({
                            method,
                            url: `${parts.join('/')}`
                        })
                        .then(({ data }) => console.info(JSON.stringify(data)))
                        .catch((error) => {
                            const { status, statusText, headers, data } =
                                error.response;
                            console.info({
                                status,
                                statusText,
                                headers,
                                data
                            });
                        });
                });
        });
        return _program;
    }
}

export { AxiosCli };
