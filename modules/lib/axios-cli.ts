/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { exec } from 'child_process';
import * as queryString from 'querystring';

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { Command } from 'commander';

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
    headers: Record<string, string>;
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
                            headers: { ...authHeaders, ...this.props.headers }
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

        _program
            .command('ab [parts...]')
            .description('runs apache benchmark on resources')
            .option('-q, --query [value]', 'set the request query', collect, [])
            .option('-N, --number [value]', 'set the number of requests', '100')
            .option(
                '-C, --concurrency [value]',
                'set the number of concurrent requests',
                '10'
            )
            .option('-M, --method [name]', 'set the request method', 'GET')
            .action(async (parts, options) => {
                const query = makeDataObject({}, options.query);
                const url = `${this.props.baseURL}/${parts.join(
                    '/'
                )}?${queryString.stringify(query)}`;
                const token = await this.props.auth.bearerToken();
                const abArgs = [
                    'ab',
                    `-n ${options.number}`,
                    `-c ${options.concurrency}`,
                    `-m ${options.method}`,
                    `-H 'Content-Type: application/json'`,
                    `-H 'Authorization: Bearer ${token}`,
                    `-v 5`,
                    `'${url}'`
                ];
                const ab = exec(abArgs.join(' '));
                ab.stdout?.pipe(process.stdout);
                ab.stderr?.pipe(process.stderr);
            });

        return _program;
    }
}

export { AxiosCli };
