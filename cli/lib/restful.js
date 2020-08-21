"use strict";

const http = require("http");
const queryString = require("query-string");
const program = require("commander");
const prettyJson = require("prettyjson");

const jsonOptions = {
  numberColor: "yellow",
};

function collect(val, memo) {
  memo.push(val);
  return memo;
}

function extractQuery(parameters) {
  const query = {};
  parameters.forEach((value) => {
    const parts = value.split("=");
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
    program.option("-c, --context [context]", "context path", this.context);
    program.option(
      "-i, --instance [instance]",
      "target instance",
      this.instance
    );
    program.option("-h, --host [host]", "target host", this.host);
    program.option("-p, --port [port]", "target port", this.port);

    const base = this;

    ["get", "post", "put", "delete", "head"].forEach((method) => {
      program
        .command(`${method} [parts...]`)
        .description(`${method} ${base.name} resources`)
        .option("-q, --query [value]", "set the request query", collect, [])
        .action((parts, options) => {
          const query = Object.assign(
            {},
            base.query,
            extractQuery(options.query)
          );
          const authorization =
            program.username && program.secret
              ? `Basic ${Buffer.from(
                  program.username + ":" + program.secret
                ).toString("base64")}`
              : undefined;

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
          request.end();
        });
    });

    return program;
  }
}

module.exports = Restful;
