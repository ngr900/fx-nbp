const { validateDate, isNumber, daysBetween } = require('./helpers.js');
const { formCurrencyCode, isCurrencySupported } = require('./currency.js');
const { FXNBPError, FXNBPDateError } = require('./errors.js');
const { isHoliday } = require('poland-public-holidays');

function validateDateRange(startDate, endDate) {
	if (daysBetween(startDate, endDate) > 367) {
		throw new FXNBPDateError('Requested range is longer than 367 days.');
	}
}

function validateAmountOfRecords(amount) {
	if (!isNumber(amount)) {
		throw new FXNBPError('Requested amount is not a number.');
	}
	if (amount < 0) {
		throw new FXNBPError('Requested amount is negative.');
	}
	if (!Number.isInteger(amount)) {
		throw new FXNBPError('Requested amount is not an integer.');
	}
	if (amount > 255) {
		throw new FXNBPError('Requested amount is larger than 255.');
	}
	return amount;
}

function validateFXDate(date) {
	date = validateDate(date);
	if (date > new Date())
		throw new FXNBPDateError(`Requested date is in the future.`);
	if ([0, 6].includes(date.getDay()))
		throw new FXNBPDateError(`Requested date is a Saturday or Sunday.`);
	if (isHoliday(date))
		throw new FXNBPDateError(`Requested date is a public holiday in Poland.`);
	return date;
}

function validateCurrencyCode(code) {
	code = formCurrencyCode(code);
	if (!isCurrencySupported(code)) {
		throw FXNBPError('Currency not supported.');
	}
	return code;
}

module.exports = {
	validateDateRange,
	validateAmountOfRecords,
	validateFXDate,
	validateCurrencyCode,
};
