const {
	FXNBPDateError,
	throwUnexpectedError,
} = require('./errors.js');

function validateDate(date) {
	let dateObject;

	if (date instanceof Date) {
		dateObject = date;
	} else if (typeof date === 'string') {
		const dateString = date[date.length-1] === 'Z' ? date : (date + 'Z');
		dateObject = new Date(dateString);
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

function daysBetween(date1, date2) {
	if (date1 > date2) {
		const temp = date1;
		date1 = date2;
		date2 = temp;
	}
	return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
}

function formFXDate(date) {
	return date.toISOString().slice(0, 10);
}

module.exports = {
	validateDate,
	addDays,
	isSameDay,
	daysBetween,
	isNumber,
	formFXDate
};
