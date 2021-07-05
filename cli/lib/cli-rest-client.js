"use strict";

const http = require("http");
const https = require("https");
const queryString = require("query-string");
const program = require("commander");
const prettyJson = require("prettyjson");
const { exec } = require("child_process");

const jsonOptions = {
  numberColor: "yellow",
};

function collect(val, memo) {
  memo.push(val);
  return memo;
}

const paramRegex = /(?<key>[a-zA-Z]+)=(?<value>.*)/;

function extractParameters(parameters) {
  const query = {};
  parameters.forEach((parameter) => {
    const matcher = parameter.match(paramRegex);
    if (matcher) {
      const key = matcher.groups["key"];
      const value = matcher.groups["value"];
      if (value === "true") {
        query[key] = true;
      } else if (value === "false") {
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

function authorizationHeader(userName, password, token) {
  if (token) {
    return `Bearer ${token}`;
  }
  return userName && password
    ? `Basic ${Buffer.from(userName + ":" + password).toString("base64")}`
    : undefined;
}

class RestClient {
  constructor(options) {
    this.name = options.name;
    this.apiUrl = options.apiUrl;
    this.json = options.json;
    this.auth = options.auth;
    this.query = options.query || {};
    this.instance = options.instance;
    // TODO : add validation
    this.host = options.host;
    this.port = options.port;
    this.context = options.context || "";
    this.client = options.ssl ? https : http;
    this.headers = options.headers || {};
    this.handler =
      options.handler ||
      function (json) {
        console.log(prettyJson.render(json, jsonOptions));
      };
  }

  program() {
    program.option(
      "-u, --username [name]",
      "auth username",
      this.auth && this.auth.user
    );
    program.option(
      "-s, --secret [pass]",
      "auth password",
      this.auth && this.auth.pass
    );
    program.option(
      "-t, --token [token]",
      "bearer token",
      this.auth && this.auth.token
    );
    program.option("-c, --context [context]", "context path", this.context);
    program.option(
      "-i, --instance [instance]",
      "target instance",
      this.instance
    );
    program.option("-h, --host [host]", "target host", this.host);
    program.option("-p, --port [port]", "target port", this.port);
    program.option("-r, --raw", "display raw output");

    const base = this;

    program
      .command("ab [parts...]")
      .description("runs apache benchmark on resources")
      .option("-q, --query [value]", "set the request query", collect, [])
      .option("-N, --number [value]", "set the number of requests", "100")
      .option(
        "-C, --concurrency [value]",
        "set the number of concurrent requests",
        "10"
      )
      .option("-M, --method [name]", "sets the request method", "GET")
      .action((parts, options) => {
        const query = makeDataObject(base.query, options.query);
        const context = program.context === "/" ? "" : program.context;
        const url = `http://${program.host}:${program.port}${context}${
          base.apiUrl
        }/${parts.join("/")}?${queryString.stringify(query)}`;

        const authorization = authorizationHeader(
          program.username,
          program.secret,
          program.token
        );
        // noinspection JSUnresolvedVariable
        const abArgs = [
          "ab",
          `-n ${options.number}`,
          `-c ${options.concurrency}`,
          `-m ${options.method}`,
          "-H 'Content-Type: application/json'",
          `-H 'Authorization: ${authorization}'`,
          // `-A '${program.username}:${program.secret}'`,
          "-v 5",
          `'${url}'`,
        ];
        const ab = exec(abArgs.join(" "));
        ab.stdout.pipe(process.stdout);
        ab.stderr.pipe(process.stderr);
      });

    ["get", "post", "put", "delete", "head"].forEach((method) => {
      program
        .command(`${method} [parts...]`)
        .description(`${method} ${base.name} resources`)
        .option("-q, --query [value]", "set the request query", collect, [])
        .option("-d, --data [value]", "set the request data", collect, [])
        .action((parts, options) => {
          const query = makeDataObject(base.query, options.query);
          const data = makeDataObject({}, options.data);
          const authorization = authorizationHeader(
            program.username,
            program.secret,
            program.token
          );
          const context = program.context === "/" ? "" : program.context;

          const headers = Object.assign({}, this.headers, {
            "User-Agent": "devbox-rest-client",
            "Content-Type": "application/json",
            Accept: "application/json",
          });
          if (authorization) {
            headers["Authorization"] = authorization;
          }
          const settings = {
            host: program.host,
            path: `${context}${base.apiUrl}/${parts.join(
              "/"
            )}?${queryString.stringify(query)}`,
            headers: headers,
            method: method,
          };
          if (program.port) {
            settings["port"] = program.port;
          }
          const callback = (response) => {
            if (!program.raw) {
              console.debug(
                `--------- ${response.statusCode}\n${prettyJson.render(
                  response.headers,
                  jsonOptions
                )}\n-------\n`
              );
            }
            let buffer = "";
            response.on("data", (chunk) => {
              buffer += chunk;
            });
            response.on("end", () => {
              if (buffer !== "") {
                if (program.raw) {
                  console.log(buffer.toString());
                } else {
                  this.handler(JSON.parse(buffer.toString()));
                }
              }
            });
          };

          const request = this.client.request(settings, callback);
          request.write(JSON.stringify(data));
          request.end();
        });
    });

    return program;
  }
}

module.exports = RestClient;
