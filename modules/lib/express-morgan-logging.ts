/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Express, Request } from 'express';
import morgan from 'morgan';
import prettyJson from 'prettyjson';

const expressMorganLogging = (app: Express) => {
    morgan.token<Request>('body', (request) => {
        return prettyJson.render(request.body);
    });
    morgan.token<Request>('headers', (request) => {
        return prettyJson.render(request.headers);
    });
    app.use(
        morgan(
            ':remote-addr - ' +
                ':remote-user [:date[clf]] ' +
                '":method :url HTTP/:http-version" ' +
                ':status :response-time ms ":user-agent"' +
                '\n:headers\n***\n:body\n------------------------'
        )
    );
};

export { expressMorganLogging };
