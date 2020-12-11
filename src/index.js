const {
	canRequestRatesForDate,
	isCurrencySupported,
	getSupportedCurrencies,
} = require('./api/helperApi.js');

const ratesApi = require('./api/ratesApi.js');

module.exports = {
  canRequestRatesForDate,
	isCurrencySupported,
  getSupportedCurrencies,
  rates: ratesApi
}