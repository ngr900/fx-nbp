const {
	validateCurrencyCode,
	validateFXDate,
	adjustFXDate,
	validateDateRange,
	validateAmountOfRecords,
} = require('../lib/validate.js');

const {
	formSingleRateResponse,
	formMultiRateResponse,
} = require('../lib/response/rates.js');

const { performCall } = require('../lib/core.js');

async function getCurrentRate(code) {
	code = validateCurrencyCode(code);
	const data = await performCall(`rates/A/${code}`);
	return formSingleRateResponse(data);
}

async function getRateForDate(code, date, adjustDate = true) {
	date = adjustDate ? adjustFXDate(date) : validateFXDate(date);
	code = validateCurrencyCode(code);
	const data = await performCall(`rates/A/${code}/${date}`);
	return formSingleRateResponse(data);
}

async function getLastRates(code, amount = 10) {
	code = validateCurrencyCode(code);
	amount = validateAmountOfRecords(amount);
	const data = await performCall(`rates/A/${code}/last/${amount}`);
	return formMultiRateResponse(data);
}

async function getRatesBetweenDates(code, [startDate, endDate]) {
	code = validateCurrencyCode(code);
	[startDate, endDate] = validateDateRange([startDate, endDate]);
	const data = await performCall(`rates/A/${code}/${startDate}/${endDate}`);
	return formMultiRateResponse(data);
}

module.exports = {
	getCurrentRate,
	getRateForDate,
	getLastRates,
	getRatesBetweenDates,
};
