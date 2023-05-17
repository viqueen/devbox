import minimist from 'minimist';
import express from 'express';
import { expressMorganLogging } from '../lib/express-morgan-logging';
import serveStatic from 'serve-static';

const argv = minimist(process.argv.slice(2));

const port = argv.port || 7000;

const app = express();
const cwd = process.cwd();
expressMorganLogging(app);

app.use('/static', serveStatic(cwd));
app.listen(port, () => {
    console.log(`⚡️ static server started at http://localhost:${port}/static`);
});
