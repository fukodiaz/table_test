export default class TableService {

	// _apiBase= 'http://localhost:3000';
	//_apiBase= 'https://table-test-spa.herokuapp.com/api';
	_apiBase= 'https://table-test-api.vercel.app';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		
		if (!res.ok) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		return res.json();
	}

	getUsers = async () => {
		const res = await this.getResource(`/users`, {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-type': 'application/json'
			}
		});
		return res;
	}
}