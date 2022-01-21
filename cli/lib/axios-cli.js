"use strict";

const Command = require("commander").Command;
const axios = require("axios");

class AxiosCli {
  constructor(options) {
    this.client = axios.create({
      baseURL: options.baseURL,
    });
    this.name = options.name;
  }

  program() {
    const commander = new Command();

    ["get", "post", "delete"].forEach((method) => {
      commander
        .command(`${method} [parts...]`)
        .description(`${method} ${this.name} resources`)
        .action((parts) => {
          this.client
            .request({
              method: method,
              url: `/${parts.join("/")}`,
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
