'use strict';

const request = require('request-promise');
const queryString = require('query-string');
const program = require('commander');
const prettyJson = require('prettyjson');

require('request-debug')(request, (type, data, req) => {
    if (type === 'response') {
        console.log('--------- %s', data.statusCode);
        console.log(prettyJson.render(data.headers));
        const body = data.body;
        if (body) {
            console.log('***');
            console.log(prettyJson.render(data.body));
        }
    }
});

function collect(val, memo) {
    memo.push(val);
    return memo;
}

function extractQuery(parameters) {
    const query = {};
    parameters.forEach((value) => {
        const parts = value.split('=');
        query[parts[0]] = parts[1];
    });
    return query;
}

class Restful {
    constructor(options) {
        this.name = options.name;
        this.apiUrl = options.apiUrl;
        this.json = options.json;
        this.auth = options.auth;
        this.query = options.query || {};
        this.instance = options.instance;
        this.host = options.host || 'localhost';
        this.port = options.port || '8080';
        this.context = options.context || '';
    }

    program() {
        program.option('-u, --username [name]', 'auth username', this.auth && this.auth.user);
        program.option('-s, --secret [pass]', 'auth password', this.auth && this.auth.pass);
        program.option('-c, --context [context]', 'context path', this.context);
        program.option('-i, --instance [instance]', 'target instance', this.instance);
        program.option('-h, --host [host]', 'target host', this.host);
        program.option('-p, --port [port]', 'target port', this.port);

        const base = this;

        ['get', 'post', 'put', 'delete', 'head'].forEach(
            method => {
                program
                    .command(`${method} [parts...]`)
                    .description(`${method} ${base.name} resources`)
                    .option('-q, --query [value]', 'set the request query', collect, [])
                    .action(
                        (parts, options) => {
                            const query = Object.assign({}, base.query, extractQuery(options.query));
                            const auth = (program.username && program.secret)
                                ? { user : program.username, pass : program.secret }
                                : undefined;

                            const context = program.context === "/" ? "" : program.context;
                            const url = program.instance || `http://${program.host}:${program.port}${context}`;

                            request({
                                url     : `${url}${base.apiUrl}/${parts.join('/')}?${queryString.stringify(query)}`,
                                method  : method,
                                json    : base.json,
                                auth    : auth,
                                headers : {
                                    'User-Agent' : 'devtools-request',
                                    'Content-Type': 'application/json'
                                }
                            })
                                .catch(error => {
                                    console.error(error);
                                })
                        }
                    )
            }
        );

        return program;
    }
}

module.exports = Restful;