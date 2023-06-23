import { Express } from 'express';
import cors from 'cors';

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
