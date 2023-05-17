import * as queryString from 'querystring';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import express from 'express';
import * as http from 'http';

interface AxiosOauthClientProps {
    name: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    authorizeUrl: string;
    grantUrl: string;
}

class AxiosOauthClient {
    private readonly state: string;

    constructor(private readonly props: AxiosOauthClientProps) {
        this.state = crypto.randomUUID();
    }

    _redirectUri() {
        return `http://localhost:6060/oauth/callback/${this.props.name}`;
    }

    _authorizationUrl() {
        const authQuery = {
            response_type: 'code',
            client_id: this.props.clientId,
            scope: this.props.scopes.join(' '),
            redirect_uri: this._redirectUri(),
            state: this.state
        };
        return `${this.props.authorizeUrl}?${queryString.stringify(authQuery)}`;
    }

    async _grantAccess(code: string) {
        const client = axios.create({
            baseURL: this.props.grantUrl,
            auth: {
                username: this.props.clientId,
                password: this.props.clientSecret
            }
        });
        const query = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this._redirectUri()
        };
        return await client.request({
            url: '',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(query)
        });
    }

    _storeToken(payload: Record<string, string>) {
        const target = path.join(os.homedir(), '.oauth', this.props.name);
        fs.mkdirSync(target, { recursive: true });
        fs.writeFileSync(
            path.join(target, 'token.json'),
            JSON.stringify(payload)
        );
    }

    async login(): Promise<void> {
        return new Promise((resolve) => {
            const app = express();
            const server = http.createServer(app);

            app.get(
                `/oauth/callback/${this.props.name}`,
                async (request, response) => {
                    const { code, state } = request.query;
                    if (state !== this.state) {
                        console.error('invalid state');
                        response.sendStatus(400);
                    } else {
                        const { data } = await this._grantAccess(
                            code as string
                        );
                        this._storeToken(data);
                        response.sendStatus(200);
                    }
                    await server.close();
                    resolve();
                }
            );

            server.listen(6060, () => {
                open(this._authorizationUrl());
            });
        });
    }

    async accessToken(): Promise<string | undefined> {
        const target = path.join(
            os.homedir(),
            '.oauth',
            this.props.name,
            'token.json'
        );
        if (!fs.existsSync(target)) {
            console.error('you need to login first');
            return;
        }
        const payload = JSON.parse(fs.readFileSync(target).toString());
        // noinspection JSUnresolvedVariable
        return payload.access_token;
    }
}

export { AxiosOauthClient };
