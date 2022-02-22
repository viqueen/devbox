"use strict";

const Command = require("commander").Command;
const axios = require("axios");

class AxiosCli {
  constructor(options) {
    this.client = axios.create({
      baseURL: options.baseURL,
    });
    this.name = options.name;
    this.auth = options.auth || { bearerToken: undefined };
  }

  program() {
    const commander = new Command();

    ["get", "post", "delete", "put", "head", "option"].forEach((method) => {
      commander
        .command(`${method} [parts...]`)
        .description(`${method} ${this.name} resources`)
        .action((parts) => {
          const headers = this.auth.bearerToken
            ? { Authorization: `Bearer ${this.auth.bearerToken}` }
            : {};
          this.client
            .request({
              method: method,
              url: `/${parts.join("/")}`,
              headers,
            })
            .then((response) => console.log(response.data))
            .catch((error) => {
              const { status, statusText, headers, data } = error.response;
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
