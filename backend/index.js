import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api/api.js';
import cors from 'cors';


const port = 3000;


let app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// api router
app.use('/', api);

app.server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

