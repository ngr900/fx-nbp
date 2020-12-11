const {
	throwUnexpectedError,
} = require('./errors.js');

async function fetchJSON(url) {
	const response = await fetch(url);
	const json = response.json();
	return json;
}

function performCall(endpoint) {
	const url = `http://api.nbp.pl/api/exchangerates/${endpoint}`;
	try {
		return fetchJSON(url);
	} catch (error) {
		throwUnexpectedError(error);
	}
}

module.exports = {
  performCall
}