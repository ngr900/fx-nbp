const {
	validateDate,
	validateCurrencyCode,
	validateFXDate,
	adjustFXDate,
	validateDateRange,
	validateAmountOfRecords,
} = require('../lib/validate.js');

const {
	formSingleTableResponse,
  formMultiTableResponse,
} = require('../lib/response/tables.js');

const { performCall } = require('../lib/core.js');

async function getCurrentTable() {
	const data = await performCall(`tables/A`);
	return formSingleTableResponse(data[0]);
}

async function getTableForDate(date, adjustDate = true) {
	date = adjustDate ? adjustFXDate(date) : validateFXDate(date);
	const data = await performCall(`tables/A/${date}`);
	return formSingleTableResponse(data[0]);
}

async function getLastTables(amount = 10) {
	amount = validateAmountOfRecords(amount);
	const data = await performCall(`tables/A/last/${amount}`);
	return formMultiTableResponse(data);
}

async function getTablesBetweenDates(startDate, endDate) {
	[startDate, endDate] = validateDateRange(startDate, endDate);
	const data = await performCall(`tables/A/${startDate}/${endDate}`);
	return formMultiTableResponse(data);
}

module.exports = {
	getCurrentTable,
	getTableForDate,
	getLastTables,
	getTablesBetweenDates
};
