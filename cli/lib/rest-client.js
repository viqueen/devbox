"use strict";

const http = require("http");
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

function extractParameters(parameters) {
  const query = {};
  parameters.forEach((value) => {
    const parts = value.split("=");
    query[parts[0]] = parts[1];
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
    this.host = options.host || "localhost";
    this.port = options.port || "8080";
    this.context = options.context || "";
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

        // noinspection JSUnresolvedVariable
        const abArgs = [
          "ab",
          `-n ${options.number}`,
          `-c ${options.concurrency}`,
          `-m ${options.method}`,
          "-H 'Content-Type: application/json'",
          `-A '${program.username}:${program.secret}'`,
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

          const settings = {
            host: program.host,
            port: program.port,
            path: `${context}${base.apiUrl}/${parts.join(
              "/"
            )}?${queryString.stringify(query)}`,
            headers: {
              "User-Agent": "devbox-rest-client",
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: authorization,
            },
            method: method,
          };

          const callback = (response) => {
            console.debug(
              `--------- ${response.statusCode}\n${prettyJson.render(
                response.headers,
                jsonOptions
              )}\n-------\n`
            );
            let buffer = "";
            response.on("data", (chunk) => {
              buffer += chunk;
            });
            response.on("end", () => {
              if (buffer !== "") {
                console.log(
                  prettyJson.render(JSON.parse(buffer.toString()), jsonOptions)
                );
              }
            });
          };

          const request = http.request(settings, callback);
          request.write(JSON.stringify(data));
          request.end();
        });
    });

    return program;
  }
}

module.exports = RestClient;