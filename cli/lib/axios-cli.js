/**
 * Copyright 2025 Hasnae Rehioui
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
const axios = require('axios');
const { Command } = require('commander');

const paramRegex = /(?<key>[a-zA-Z)_]+)=(?<value>.*)/;

function collect(val, memo) {
    memo.push(val);
    return memo;
}

function extractParameters(parameters) {
    const query = {};
    parameters.forEach((parameter) => {
        const matcher = parameter.match(paramRegex);
        if (matcher) {
            const key = matcher.groups['key'];
            const value = matcher.groups['value'];
            if (value === 'true') {
                query[key] = true;
            } else if (value === 'false') {
                query[key] = false;
            } else {
                query[key] = encodeURI(value);
            }
        }
    });
    return query;
}

function makeDataObject(fromBase, fromOptions) {
    return Object.assign({}, fromBase, extractParameters(fromOptions));
}

class AxiosCli {
    constructor(options) {
        this.client = axios.create({
            baseURL: options.baseURL
        });
        this.name = options.name;
        this.auth = options.auth || { bearerToken: async () => undefined };
        this.headers = options.headers || {};
    }

    program() {
        const cli = new Command();

        ['get', 'post', 'delete', 'put', 'head', 'option'].forEach((method) => {
            cli.command(`${method} [parts...]`)
                .description(`${method} ${this.name} resources`)
                .option(
                    '-q, --query [value]',
                    'set the request query',
                    collect,
                    []
                )
                .option(
                    '-d, --data [value]',
                    'set the request data',
                    collect,
                    []
                )
                .action(async (parts, options) => {
                    const query = makeDataObject({}, options.query);
                    const token = await this.auth.bearerToken();
                    const authHeader = token
                        ? { Authorization: `Bearer ${token}` }
                        : {};
                    const headers = {
                        ...this.headers,
                        ...authHeader
                    };
                    const requestConfig = {
                        method: method,
                        url: `/${parts.join('/')}`,
                        headers: headers,
                        params: query,
                        data: makeDataObject({}, options.data)
                    };
                    this.client
                        .request(requestConfig)
                        .then(({ data }) => console.log(JSON.stringify(data)))
                        .catch((error) => {
                            const { status, statusText, headers, data } =
                                error.response;
                            console.log({
                                status,
                                statusText,
                                headers,
                                data
                            });
                        });
                });
        });

        return cli;
    }
}

module.exports = AxiosCli;
