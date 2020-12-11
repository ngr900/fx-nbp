const {
	throwUnexpectedError,
} = require('./errors.js');

const baseURL = 'http://api.nbp.pl/api/exchangerates';

async function performCall(endpoint) {
	const url = `${baseURL}/${endpoint}`;
	try {
		return await fetchJSON(url);
	} catch (error) {
		throwUnexpectedError(error);
	}
}

async function fetchJSON(url) {
	const response = await fetch(url);
	const json = response.json();
	return json;
}

module.exports = {
  performCall
}