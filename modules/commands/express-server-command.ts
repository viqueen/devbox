import minimist from 'minimist';
import express from 'express';
import { expressMorganLogging } from '../lib/express-morgan-logging';
import { withCors } from '../lib/with-cors';

const argv = minimist(process.argv.slice(2));

const port = argv.port || 24642;

const app = express();
expressMorganLogging(app);
withCors({
    app,
    product: {
        baseUrls: ['http://localhost:24642', 'http://localhost:24643', 'null']
    }
});
let counter = 0;

app.get('/', (request, response) => {
    const current = counter++;
    response.redirect(`http://localhost:24643/pong/${current}`);
});

app.get('/pong/:value', (request, response) => {
    const { value } = request.params;
    response.redirect('http://localhost:24642/');
});

app.listen(port, () => {
    console.log(`⚡️ express server started at http://localhost:${port}`);
});
