#! /usr/bin/env node

'use strict';

const express = require('express');
const serveIndex = require('serve-index');
const logger = require('express-bunyan-logger');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
const resources = path.join(__dirname, '../.static-resources');

app.use(logger({
  name: 'logger',
  streams: [{
    level: 'info',
    stream: process.stdout
  }]
}));

app.post('/api/evil', function (req, res) {
  fs.readFile(path.resolve(__dirname, '../.static-resources/user-mgt.xml'), 'utf8', (err, data) => {
    res.set('Content-Type', 'application/xml');
    res.set('X-Embedded-Crowd-Version', '2');
    res.send(data);
  });
});

app.use('/', express.static(resources), serveIndex(resources, { icons: true }));
app.listen(port);
