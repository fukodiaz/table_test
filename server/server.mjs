import express from 'express';
import cors from 'cors';
//import createPath from './helpers/create-path.mjs';
import rewrite from 'express-urlrewrite';

import {default as usersRouter} from './routers/users-router.mjs';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
	origin: 'https://table-test-psi.vercel.app',
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
//app.use(express.static('dist')); //for dev
//app.use(rewrite('/api/*', '/$1'));

app.use('/users', usersRouter);

app.listen(PORT);

// app.get('/', (req, res) => { //for dev
// 	res.sendFile(createPath('index'));
// });

app.get('/', (req, res) => {
	res.status(200).type('text/plain');
	res.send('Home page...');
});

app.use((req, res) => {
	res
		.status(404)
		.send('<h1>Error! Something wrong happened ..!</h1>')
});

export default app;