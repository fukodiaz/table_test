import {Router} from 'express';
import * as fs from 'fs';

export const router = Router();

router.get('/', async (req, res) => {
	// const path = './server/data/db.json';
	const path = 'data/db.json';
	
	fs.readFile(path, (error, data) => {
		if (fs.existsSync(path)) {
			res.send(data.toString());
		}
		if (error) {
			console.log(error, 44);
		}
	})
});