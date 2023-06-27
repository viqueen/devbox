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
import cors from 'cors';
import { Express } from 'express';

interface WithCors {
    app: Express;
    product: {
        baseUrls: string[];
    };
}

const withCors = ({ app, product }: WithCors) => {
    app.options(
        `/*`,
        cors<cors.CorsRequest>({
            origin: [...product.baseUrls],
            credentials: true
        })
    );
    app.use(
        `/*`,
        cors<cors.CorsRequest>({
            origin: [...product.baseUrls],
            credentials: true
        })
    );
};

export { withCors };
