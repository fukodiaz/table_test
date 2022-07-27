import express from 'express';
import cors from 'cors';
import createPath from './helpers/create-path.mjs';

import {router as usersRouter} from './routers/users-router.mjs';

const app = express();
const PORT = 3000;
const corsOptions = {
	origin: 'http://localhost:8080',
	//credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use(express.static('dist'));

app.use('/users', usersRouter);

app.listen(PORT);

app.get('/', (req, res) => {
	res.sendFile(createPath('index'));
});

app.use((req, res) => {
	res
		.status(404)
		.send('<h1>Error! Something wrong happened ..!</h1>')
});