'use strict';

const express = require('express');

// Constants
const PORT = 5050;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.send('Docker file here\n');
});

app.listen(PORT, HOST);
console.log(`Express server listening on http://${HOST}:${PORT}`);
