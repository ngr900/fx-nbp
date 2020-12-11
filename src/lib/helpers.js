const {
	FXNBPDateError,
	FXNBPError,
	throwUnexpectedError,
} = require('./errors.js');

function validateDate(date) {
	let dateObject;

	if (date instanceof Date) {
		dateObject = date;
	} else if (typeof date === 'string') {
		dateObject = new Date(date);
	}

	if (dateObject !== undefined && dateObject.toString() !== 'Invalid Date') {
		return dateObject;
	} else {
		throw new FXNBPDateError(`Invalid date.`);
	}
}

function isNumber(value) {
	return typeof value === 'number' && isFinite(value);
}

function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function isSameDay(date1, date2) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

async function fetchJSON(url) {
	const response = await fetch(url);
	const json = response.json();
	return json;
}

function daysBetween(date1, date2) {
	if (date1 > date2) {
		const temp = date1;
		date1 = date2;
		date2 = temp;
	}
	return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
}

function performCall(endpoint) {
	const url = `http://api.nbp.pl/api/exchangerates/${endpoint}`;
	try {
		return fetchJSON(url);
	} catch (error) {
		throwUnexpectedError(error);
	}
}

function formFXDate(date) {
	return date.toISOString().slice(0, 10);
}

module.exports = {
	validateDate,
	addDays,
	isSameDay,
	daysBetween,
	performCall,
	isNumber,
	formFXDate
};
