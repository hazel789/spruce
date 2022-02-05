import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api/api.js';

const port = 3000;


let app = express();
app.server = http.createServer(app);
app.use(bodyParser.json());




// api router
app.use('/', api);

app.server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

