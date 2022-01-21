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
        .action(async (parts) => {
          const response = await this.client.request({
            method: method,
            url: `/${parts.join("/")}`,
          });
          console.log(response.data);
        });
    });

    return commander;
  }
}

module.exports = AxiosCli;
