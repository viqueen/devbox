'use strict';

const Command = require('commander').Command;
const axios = require('axios');
const queryString = require('query-string');

const paramRegex = /(?<key>[a-zA-Z]+)=(?<value>.*)/;

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
            baseURL: options.baseURL,
        });
        this.name = options.name;
        this.auth = options.auth || { bearerToken: async () => undefined };
    }

    program() {
        const commander = new Command();

        ['get', 'post', 'delete', 'put', 'head', 'option'].forEach((method) => {
            commander
                .command(`${method} [parts...]`)
                .description(`${method} ${this.name} resources`)
                .option(
                    '-q, --query [value]',
                    'set the request query',
                    collect,
                    []
                )
                .action(async (parts, options) => {
                    const query = makeDataObject({}, options.query);
                    const token = await this.auth.bearerToken();
                    const headers = token
                        ? { Authorization: `Bearer ${token}` }
                        : {};
                    this.client
                        .request({
                            method: method,
                            url: `/${parts.join('/')}?${queryString.stringify(
                                query
                            )}`,
                            headers,
                        })
                        .then(({ data }) => console.log(JSON.stringify(data)))
                        .catch((error) => {
                            const { status, statusText, headers, data } =
                                error.response;
                            console.log({
                                status,
                                statusText,
                                headers,
                                data,
                            });
                        });
                });
        });

        return commander;
    }
}

module.exports = AxiosCli;
