const {
	canRequestRatesForDate,
	isCurrencySupported,
	getSupportedCurrencies,
} = require('./api/helperApi.js');

const ratesApi = require('./api/ratesApi.js');
const tablesApi = require('./api/tablesApi.js');

const { FXNBPError, FXNBPDateError } = require('./lib/errors.js');

module.exports = {
	canRequestRatesForDate,
	isCurrencySupported,
	getSupportedCurrencies,
	rates: ratesApi,
	tables: tablesApi,
	errors: { FXNBPError, FXNBPDateError },
};
