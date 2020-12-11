const supportedCurrencies = require('./supportedCurrencies.json');

function formCurrencyCode(code) {
	return code.toUpperCase().trim();
}

function isCurrencySupported(code) {
	code = formCurrencyCode(code);
	return supportedCurrencies.includes(code);
}

function getSupportedCurrencies() {
	return [...supportedCurrencies];
}

module.exports = {
  formCurrencyCode,
  isCurrencySupported,
  getSupportedCurrencies
}