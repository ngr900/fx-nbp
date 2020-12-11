const { validateFXDate } = require('../lib/validate.js');
const { validateDate } = require('../lib/helpers.js');
const { FXNBPDateError, throwUnexpectedError} = require('../lib/errors.js');
const {
	isCurrencySupported,
	getSupportedCurrencies,
} = require('../lib/currency.js');

function canRequestRatesForDate(date) {
	date = validateDate(date);
	try {
		validateFXDate(date);
	} catch (error) {
		if (error instanceof FXNBPDateError) {
			return false;
		} else {
			throwUnexpectedError(error);
		}
	}
	return true;
}

module.exports = {
	canRequestRatesForDate,
	isCurrencySupported,
	getSupportedCurrencies,
};
