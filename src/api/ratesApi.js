const {
	validateDate,
	performCall,
  addDays,
  formFXDate
} = require('../lib/helpers.js');
const {
	formSingleRateResponse,
	formMultiRateResponse,
} = require('../lib/formResponse.js');

const { canRequestRatesForDate } = require('./helperApi.js');

const {
	validateDateRange,
	validateAmountOfRecords,
	validateFXDate,
	validateCurrencyCode,
} = require('../lib/validate.js');

//

async function getCurrentRate(code) {
	code = validateCurrencyCode(code);
	const data = await performCall(`rates/A/${code}`);
	return formSingleRateResponse(data);
}

async function getRateForDate(code, date, adjustDate = true) {
	if (adjustDate === true) {
		date = adjustFXDate(date);
	}
	code = validateCurrencyCode(code);
	date = validateFXDate(date);
	date = formFXDate(date);
	const data = await performCall(`rates/A/${code}/${date}`);
	return formSingleRateResponse(data);
}

async function getLastRates(code, amount = 10) {
	code = validateCurrencyCode(code);
	amount = validateAmountOfRecords(amount);
	const data = await performCall(`rates/A/${code}/last/${amount}`);
	return formMultiRateResponse(data);
}

async function getRatesBetweenDates(code, startDate, endDate) {
	code = validateCurrencyCode(code);
	startDate = validateDate(startDate);
	endDate = validateDate(endDate);
	validateDateRange(startDate, endDate);
	startDate = formFXDate(startDate);
	endDate = formFXDate(endDate);
	const data = await performCall(`rates/A/${code}/${startDate}/${endDate}`);
	return formMultiRateResponse(data);
}

function adjustFXDate(date) {
	let valid = canRequestRatesForDate(date);
	while (!valid) {
		date = addDays(date, -1);
		valid = canRequestRatesForDate(date);
	}
	return date;
}

module.exports = {
	getCurrentRate,
	getRateForDate,
	getLastRates,
	getRatesBetweenDates,
};
