import {Router} from 'express';
import path from 'path';
import * as fs from 'fs';

const router = Router();

router.get('/', async (req, res) => {
	// const path = './server/data/db.json';
	// const path = 'data/db.json';
	
	// fs.readFile(path, (error, data) => {
	// 	if (fs.existsSync(path)) {
	// 		res.send(data.toString());
	// 	}
	// 	if (error) {
	// 		console.log(error, 44);
	// 	}
	// })

	const file = path.join(process.cwd(), 'data', 'db.json');
	const dataUsers = fs.readFileSync(file, 'utf8');

	res.setHeader('Content-Type', 'application/json');
	return res.end(dataUsers);
});

export default router;