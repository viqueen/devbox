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
