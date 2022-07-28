const axios = require("axios");
const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const http = require("http");
const open = require("open");
const os = require("os");
const path = require("path");
const qs = require("querystring");

class AxiosOauthClient {
  constructor(options) {
    this.name = options.name;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.scopes = options.scopes;
    this.authorizeUrl = options.authorizeUrl;
    this.grantUrl = options.grantUrl;
    this.state = crypto.randomUUID();
  }

  _redirectUri() {
    return `http://localhost:6060/oauth/callback/${this.name}`;
  }

  _authorizationUrl() {
    const authQuery = {
      response_type: "code",
      client_id: this.clientId,
      scope: this.scopes.join(" "),
      redirect_uri: this._redirectUri(),
      state: this.state,
    };
    return `${this.authorizeUrl}?${qs.stringify(authQuery)}`;
  }

  async _grantAccess(code) {
    const client = axios.create({
      baseURL: this.grantUrl,
      auth: { username: this.clientId, password: this.clientSecret },
    });
    const query = {
      grant_type: "authorization_code",
      code,
      redirect_uri: this._redirectUri(),
    };
    return await client.request({
      url: "",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(query),
    });
  }

  _storeToken(payload) {
    const target = path.join(os.homedir(), ".oauth", this.name);
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, "token.json"), JSON.stringify(payload));
  }

  async login() {
    return new Promise((resolve) => {
      const app = express();
      const server = http.createServer(app);

      app.get(`/oauth/callback/${this.name}`, async (request, response) => {
        const { code, state } = request.query;
        if (state !== this.state) {
          console.error("invalid state");
          response.sendStatus(400);
        } else {
          const { data } = await this._grantAccess(code);
          this._storeToken(data);
          response.sendStatus(200);
        }
        await server.close();
        resolve();
      });

      server.listen(6060, () => {
        open(this._authorizationUrl());
      });
    });
  }

  async accessToken() {
    const target = path.join(os.homedir(), ".oauth", this.name, "token.json");
    if (!fs.existsSync(target)) {
      console.error("you need to login first");
      return;
    }
    const payload = JSON.parse(fs.readFileSync(target).toString());
    // TODO: handle refresh token, also I need typescript
    // noinspection JSUnresolvedVariable
    return payload.access_token;
  }
}

module.exports = AxiosOauthClient;
