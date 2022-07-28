"use strict";

const Command = require("commander").Command;
const axios = require("axios");

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

    ["get", "post", "delete", "put", "head", "option"].forEach((method) => {
      commander
        .command(`${method} [parts...]`)
        .description(`${method} ${this.name} resources`)
        .action(async (parts) => {
          const token = await this.auth.bearerToken();
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          this.client
            .request({
              method: method,
              url: `/${parts.join("/")}`,
              headers,
            })
            .then(({ data }) => console.log(JSON.stringify(data)))
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
