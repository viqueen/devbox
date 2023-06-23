import minimist from "minimist";
import express from "express";
import {expressMorganLogging} from "../lib/express-morgan-logging";

const argv = minimist(process.argv.slice(2));

const port = argv.port || 24642;

const app = express();
expressMorganLogging(app);

app.get('/', (request, response) => {
    response.sendStatus(200);
})

app.listen(port, () => {
    console.log(`⚡️ express server started at http://localhost:${port}`);
});
