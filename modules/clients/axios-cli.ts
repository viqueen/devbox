import { Command } from 'commander';
import axios, { AxiosInstance } from 'axios';
import * as queryString from 'query-string';

const collect = (value: string, data: string[]) => {
    data.push(value);
    return data;
};

const paramRegex = /(?<key>[a-zA-Z]+)=(?<value>.*)/;

const extractParameters = (parameters: string[]) => {
    const query: Record<string, string | boolean> = {};
    parameters.forEach((parameter) => {
        const matcher = parameter.match(paramRegex);
        if (matcher === null || matcher.groups === undefined) return;
        const key = matcher.groups['key'];
        const value = matcher.groups['value'];
        if (value === 'true') {
            query[key] = true;
        } else if (value === 'false') {
            query[key] = false;
        } else {
            query[key] = encodeURI(value);
        }
    });
    return query;
};

const makeDataObject = (
    fromBase: Record<string, string | boolean>,
    fromOptions: string[]
) => {
    return Object.assign({}, fromBase, extractParameters(fromOptions));
};

interface AxiosCliProps {
    name: string;
    baseURL: string;
    auth: {
        bearerToken: () => Promise<string | undefined>;
    };
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
                .option(
                    '-q, --query [value]',
                    'set the request query',
                    collect,
                    []
                )
                .action(async (parts, options) => {
                    const query = makeDataObject({}, options.query);
                    const token = await this.props.auth.bearerToken();
                    const authHeaders = token
                        ? { Authorization: `Bearer ${token}` }
                        : {};
                    this.client
                        .request({
                            method,
                            url: `${parts.join('/')}?${queryString.stringify(
                                query
                            )}`,
                            headers: authHeaders
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
